import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { Router } from "@angular/router";
import { AssessmentModelService } from "@app/features/dashboard-module/services";
import {
  AssessmentModelDataModel,
  AssessmentRouteConstants,
  ConfirmationDialogComponent,
} from "@app/utility";
import { Observable, Subscription } from "rxjs";
import { CriteriaDescriptionDialogComponent } from "../criteria-description-dialog/criteria-description-dialog.component";

@Component({
  selector: "app-criteria-list",
  templateUrl: "./criteria-list.component.html",
  styleUrls: ["./criteria-list.component.scss"],
})
export class CriteriaListComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  // State Variables
  isShowCriteriaSearch = false;

  @ViewChild("tabGroup", { static: false }) tabGroup;

  @Input() modelData: AssessmentModelDataModel;
  @Input() currentSubElement;
  @Input() isModelReference: boolean;

  @Output() criteriaUpdate = new EventEmitter<any>();
  @Output() criteriaAdd = new EventEmitter<any>();
  @Output() criteriaRemove = new EventEmitter<any>();

  searchCriteriaFormControl: FormControl = new FormControl("");

  levelCriteriaList = [];
  displayCriteriaList = [];
  levels = [];
  dialogRef;

  isLoadingCriteria = false;
  private deleteCriteriaSubscription$: Subscription;
  private listCriteriaSubscription$: Subscription;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private assessmentModelService: AssessmentModelService
  ) { }

  ngOnInit() {
    if (this.modelData) {
      this.bindLevels(+this.modelData.max_level);
    }
  }

  ngAfterViewInit() {
    this.bindCriteria();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentSubElement) {
      const change = changes.currentSubElement;
      if (!change.firstChange) {
        if (
          change.previousValue &&
          change.previousValue._id !== change.currentValue._id
        ) {
          this.bindCriteria();
        } else if (change.currentValue) {
          this.bindCriteria();
        }
      }
    }
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent) => {
    this.bindCriteria();
  };

  bindCriteria = () => {
    if (
      this.modelData &&
      this.modelData._id &&
      this.currentSubElement &&
      this.currentSubElement._id &&
      this.tabGroup &&
      this.tabGroup.selectedIndex >= 0
    ) {
      const params = {
        element_id: this.currentSubElement._id,
        level: this.currentLevel,
      };
      this.isLoadingCriteria = true;
      this.levelCriteriaList = [];
      this.displayCriteriaList = [];
      if (this.listCriteriaSubscription$) {
        this.listCriteriaSubscription$.unsubscribe();
      }
      this.listCriteriaSubscription$ = this.getCriteria(params).subscribe(
        (response) => {
          this.handleGetCriteriaResponse(response);
          this.filterCriteriaList();
        }
      );
    }
  };

  onEditCriteria = (criteria) => {
    this.openCriteriaDialog(criteria);
  };

  onDeleteConfirmation = (criteria) => {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: "Are you sure want to delete this practice?",
        title: "Delete Practice",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        if (this.deleteCriteriaSubscription$) {
          this.deleteCriteriaSubscription$.unsubscribe();
        }
        this.deleteCriteriaSubscription$ = this.deleteSelectedCriteria(criteria._id).subscribe((response) => {
          this.criteriaRemove.emit(true);
          this.bindCriteria();
        });
      }
    });
  };

  toggleSearchFilter = () => {
    if (this.isShowCriteriaSearch) {
      this.searchCriteriaFormControl.reset();
      this.filterCriteriaList();
    }
    this.isShowCriteriaSearch = !this.isShowCriteriaSearch;
  };

  filterCriteriaList() {
    const filterValue: string = this.searchCriteriaFormControl.value || "";
    this.displayCriteriaList = this.levelCriteriaList.filter((elem) => {
      const description: string = elem.description.toLowerCase();
      return description.indexOf(filterValue.toLowerCase()) > -1;
    });
  }

  deleteSelectedCriteria = (criteriaId): Observable<any> => {
    return this.assessmentModelService.deleteSelectedCriteria(criteriaId);
  };

  handleGetCriteriaResponse = (response) => {
    this.isLoadingCriteria = false;
    this.levelCriteriaList = response.payload.data;
  };

  getCriteria = (params): Observable<any> => {
    return this.assessmentModelService.getCriteria(params);
  };

  bindLevels = (levelNumber: number) => {
    this.levels = [];
    for (let i = 1; i <= levelNumber; i++) {
      this.levels.push(i);
    }
  };

  onAddCriteria = () => {
    this.openCriteriaDialog();
  };

  openCriteriaDialog = (criteria = null) => {
    this.dialogRef = this.dialog.open(CriteriaDescriptionDialogComponent, {
      width: "950px",
    });
    this.dialogRef.componentInstance.currentLevel = this.currentLevel;
    this.dialogRef.componentInstance.criteria = criteria;

    const sub = this.dialogRef.componentInstance.criteriaAddUpdate.subscribe(
      (event) => {
        if (event) {
          const { params } = event;
          this.saveCriteria(params);
        }
      }
    );
    this.dialogRef.afterClosed().subscribe((response) => {
      if (response && response.submit) {
        if (criteria) {
          this.criteriaUpdate.emit(true);
        } else {
          this.criteriaAdd.emit(true);
        }
        this.bindCriteria();
      }
      sub.unsubscribe();
    });
  };

  saveCriteria = (params) => {
    if (params) {
      let newParams = { ...params };
      if (params.criteria_id) {
        newParams = params.criterias[0];
        newParams.criteria_id = params.criteria_id
      } else {
        newParams.element_id = this.currentSubElement._id;
        newParams.level = this.currentLevel;
      }
      this.assessmentModelService.saveCriteria(newParams).subscribe(
        (response) => {
          if (this.dialogRef) {
            this.dialogRef.close({ submit: true });
          }
        },
        (error) => { }
      );
    }
  };

  onCriteriaDetails = (criteria) => {
    let url = `${AssessmentRouteConstants.ASSESSMENT_CRITERIA_DETAILS}/${criteria._id}`
      .replace(':modelId', criteria.model_id);

    if (this.isModelReference) {
      url = `${AssessmentRouteConstants.MODEL_REFERENCE_CRITERIA_DETAILS}/${criteria._id}`
        .replace(':modelId', criteria.model_id);
    }
    this.router.navigateByUrl(url);
  };

  get currentLevel() {
    return this.tabGroup.selectedIndex + 1;
  }

  ngOnDestroy() {
    if (this.listCriteriaSubscription$) {
      this.listCriteriaSubscription$.unsubscribe();
    }
    if (this.deleteCriteriaSubscription$) {
      this.deleteCriteriaSubscription$.unsubscribe();
    }
  }
}
