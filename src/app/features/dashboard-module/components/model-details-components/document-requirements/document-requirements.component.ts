import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { catchError, debounceTime, startWith, switchMap } from "rxjs/operators";
import { Observable, Subscription, throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { CommonService } from "@app/core";
import { AssessmentModelService } from "@app/features/dashboard-module/services";
import {
  ConfirmationDialogComponent,
  FormBaseComponent,
  getLevelList,
  PagerModel,
  PAGE_SIZE_OPTIONS,
} from "@app/utility";
import { DocumentRequirementsDetailsDialogComponent } from "../document-requirements-details-dialog/document-requirements-details-dialog.component";

@Component({
  selector: "app-document-requirements",
  templateUrl: "./document-requirements.component.html",
  styleUrls: ["./document-requirements.component.scss"],
})
export class DocumentRequirementsComponent extends FormBaseComponent implements OnInit, OnChanges, OnDestroy {

  filterDocumentForm: FormGroup;

  @Input() modelId;
  @Input() modelData;
  @Input() isModelReference: boolean;
  @Input() modelElementList = [];

  levels = [];
  modelDocumentRequirementList = [];
  isLoadingResults = false;
  dialogRef;
  documentTypeList = [];
  // Pagination related variables
  pageSizeOptions = PAGE_SIZE_OPTIONS;
  pager: PagerModel = {
    page: 1,
    recordsPerPage: this.pageSizeOptions[0],
    totalRecords: 0,
    filteredRecords: 0,
  };

  // State Variables
  isShowFilter = false;
  deleteConfirmationDialogRef;
  deleteDocumentRequirementSubscriber$: Subscription;
  private listDocumentSubscription$: Subscription;

  constructor(
    _fb: FormBuilder,
    private assessmentModelService: AssessmentModelService,
    private commonService: CommonService,
    public dialog: MatDialog
  ) { super(_fb) }

  ngOnInit() {
    this.createDocumentFilterForm();
    this.initModelDocumentRequirements();
    this.bindDocumentTypeList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.modelData) {
      const change = changes.modelData;
      const currentModelData = change.currentValue;
      const previousModelData = change.previousValue;
      if (currentModelData) {
        if (previousModelData && previousModelData._id !== currentModelData._id) {
          this.bindLevels(currentModelData.max_level);
        } else {
          this.bindLevels(currentModelData.max_level);
        }
      }
    }
  }

  createDocumentFilterForm = () => {
    this.filterDocumentForm = this.createForm({
      name: ['', []],
      title: ['', []],
      type: ['', []],
      level: ['', []],
      element: ['', []],
      required: ['', []],
    });
  };

  bindDocumentTypeList = () => {
    this.documentTypeList = [];
    this.getDocumentTypeList().subscribe(response => {
      this.handleDocumentTypeListResponse(response)
    }, error => {
    })
  }

  handleDocumentTypeListResponse = (response) => {
    this.documentTypeList = response.payload.documentTypes;
  }

  getDocumentTypeList = (): Observable<any> => {
    return this.commonService.getDocumentTypeList({})
  }

  initModelDocumentRequirements = (isResetPagination = true) => {
    if (this.listDocumentSubscription$) this.listDocumentSubscription$.unsubscribe();
    this.listDocumentSubscription$ = this.filterDocumentForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap(() => {
          if (isResetPagination) this.pager.page = 1;
          this.modelDocumentRequirementList = [];
          this.isLoadingResults = true;
          return this.getModelDocumentRequirements().pipe(
            catchError((error) => {
              return throwError(error);
            })
          );
        })
      )
      .subscribe(data => this.handleModelDocumentRequirementResponse(data), error => {
        this.isLoadingResults = false;
      });
  };

  handleModelDocumentRequirementResponse = (response) => {
    this.isLoadingResults = false;
    this.modelDocumentRequirementList = response.payload.data;
    this.pager = response.payload.pager || this.pager;
  }
  bindLevels = (maxLevel) => {
    this.levels = [];
    for (let i = 1; i <= maxLevel; i++) {
      this.levels.push(i);
    }
  }

  getModelDocumentRequirements = (): Observable<any> => {
    return this.assessmentModelService.getModelDocumentRequirements(this.modelId, this.apiParams)
  }

  get apiParams() {
    const { page, recordsPerPage } = this.pager;
    const { name, title, type, level, element, required } = this.filterDocumentForm.value;
    const params: any = { page, recordsPerPage };
    if (name) {
      params.name = name;
    }
    if (title) {
      params.title = title;
    }
    if (type) {
      params.type = type;
    }
    if (level && !isNaN(+level)) {
      params.level = +level;
    }
    if (required || required === false) {
      params.required = required;
    }
    if (element) {
      params.element = element;
    }
    return params;
  }

  onFilterToggle = () => {
    this.isShowFilter = !this.isShowFilter;
  };

  onClearFilter = () => {
    this.filterDocumentForm.reset();
  };

  createModelDocumentRequirement = (modelId, params): Observable<any> => {
    return this.assessmentModelService.createModelDocumentRequirement(modelId, params);
  }

  updateModelDocumentRequirement = (modelId, documentRequirementId, params): Observable<any> => {
    return this.assessmentModelService.updateModelDocumentRequirement(modelId, documentRequirementId, params);
  }

  deleteModelDocumentRequirement = (modelId, documentRequirementId): Observable<any> => {
    return this.assessmentModelService.deleteModelDocumentRequirement(modelId, documentRequirementId);
  }

  onAddDocumentRequirement = (docReq = null): void => {
    this.dialogRef = this.dialog.open(DocumentRequirementsDetailsDialogComponent, {
      width: '550px',
    });
    this.dialogRef.componentInstance.levels = this.levels;
    this.dialogRef.componentInstance.documentTypeList = this.documentTypeList;
    this.dialogRef.componentInstance.modelElementList = this.modelElementList;
    this.dialogRef.componentInstance.documentRequirementData = docReq;
    const sub = this.dialogRef.componentInstance.saveDocumentRequirement.subscribe(
      (event) => {
        const params = event.params;
        if (docReq) {
          this.updateModelDocumentRequirement(this.modelId, docReq._id, params)
            .subscribe(response => {
              const updatedDocumentRequirement = response.payload.documentRequirement;
              const documentRequirementIndex = this.modelDocumentRequirementList
                .findIndex(dr => dr._id === docReq._id);
              this.modelDocumentRequirementList[documentRequirementIndex] = updatedDocumentRequirement;
              this.onSaveDocumentRequirementSuccess(false);
            }, e => { });
        } else {
          this.createModelDocumentRequirement(this.modelId, params).subscribe(response => {
            this.onSaveDocumentRequirementSuccess(true);
          }, e => { });
        }
      }
    );

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { isCreated } = result;
        if (isCreated) {
          this.initModelDocumentRequirements()
        }
      }

      sub.unsubscribe();
    });
  }

  onSaveDocumentRequirementSuccess = (isCreated = true) => {
    if (this.dialogRef) {
      this.dialogRef.close({ isCreated });
    }
  }

  onEditDocumentRequirement = (docReq) => {
    this.onAddDocumentRequirement(docReq)
  }

  onDeleteDocumentRequirement(docReq): void {
    this.deleteConfirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: `Are you sure want to delete this ${docReq.name} Document Requirement?`,
        title: `Delete Requirement`,
      },
    });

    const sub = this.deleteConfirmationDialogRef.componentInstance.confirm.subscribe(
      (event) => {
        if (event) {
          const { submit } = event;
          if (submit) {
            if (this.deleteDocumentRequirementSubscriber$) {
              this.deleteDocumentRequirementSubscriber$.unsubscribe();
            }
            this.deleteDocumentRequirementSubscriber$ = this.deleteModelDocumentRequirement(this.modelId, docReq._id)
              .subscribe((_) => {
                this.initModelDocumentRequirements()
                this.deleteConfirmationDialogRef.close({});
              });
          }
        }
      }
    );
    this.deleteConfirmationDialogRef.afterClosed().subscribe((_) => {
      if (sub) sub.unsubscribe();
    });
  }


  getDocumentElements = (docReq) => {
    const elements = docReq.elements || [];
    return elements.filter((_, i) => i <= 2)
  }

  getMoreDocumentElements = (docReq) => {
    const elements = docReq.elements || [];
    return elements.filter((_, i) => i > 2)
  }

  pageChange = (page: any) => {
    this.pager.page = page.pageIndex + 1;
    this.pager.recordsPerPage = page.pageSize;
  };

  get isFilterApplied() {
    const { name, title, type, level, element, required } = this.filterDocumentForm.value;
    return name || title || type || level || element || required || required === false;
  }

  ngOnDestroy() {
    if (this.deleteDocumentRequirementSubscriber$) {
      this.deleteDocumentRequirementSubscriber$.unsubscribe();
    }
    if (this.listDocumentSubscription$) {
      this.listDocumentSubscription$.unsubscribe()
    }
  }
}
