import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTabChangeEvent, MatTabGroup } from "@angular/material/tabs";
import { ActivatedRoute, Router } from "@angular/router";
import { AssessmentModelService } from "@app/features/dashboard-module/services";
import {
  AssessmentModelDataModel,
  AssessmentRouteConstants,
  ModelDetailEnum,
  ConfirmationDialogComponent,
  MaturityLevelSchemaModel,
} from "@app/utility";
import { UtilityService } from "@app/utility/services";
import { Observable, Subscription } from "rxjs";
import { ActivateModelRulesDialogComponent } from "../activate-model-rules-dialog/activate-model-rules-dialog.component";
import { AssessmentModelCopyDialogComponent } from "../assessment-model-copy-dialog/assessment-model-copy-dialog.component";

@Component({
  selector: "app-model-details-container",
  templateUrl: "./model-details-container.component.html",
  styleUrls: ["./model-details-container.component.scss"],
})
export class ModelDetailsContainerComponent implements OnInit, AfterViewInit {
  modelData: AssessmentModelDataModel;
  modelElementList = [];
  id: string;
  private sub: any;
  modelStatusUpdateDialogRef;
  modelDetailEnum = ModelDetailEnum;
  isModelReference = true;
  dialogRef;
  assessmentModelList: MaturityLevelSchemaModel[] = [];

  private listAssessmentModelElementsSubscription$: Subscription;

  sortKey = "model_name";
  sortOrder = "-1";

  isModelElementListUpdated = false;
  isCriteriaUpdate = false;
  isLoadingModelResults = true;
  isLoadingModelElementsResults = true;
  selectedTabIndex: ModelDetailEnum = ModelDetailEnum.BASIC_DATA;

  @ViewChild("modelDetailTab", { static: false }) modelDetailTab: MatTabGroup;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private utilityService: UtilityService,
    private assessmentModelService: AssessmentModelService
  ) { }

  ngOnInit() {
    this.routeSubscribe();
    this.isModelReference = this.activeRoute.snapshot.data.isModelReference;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modelDetailTab.selectedIndex = this.utilityService.getModelDetailTabIndex();
      this.utilityService.setModelDetailTabIndex(ModelDetailEnum.BASIC_DATA);
    })
  }

  routeSubscribe = () => {
    this.sub = this.activeRoute.params.subscribe((params) => {
      this.id = params.modelId;
      if (this.id) {
        this.getAssessmentModel(this.id).subscribe(
          (response) => {
            this.modelData = response.payload.model;
            this.isLoadingModelResults = false;
            if (this.modelData) {
              this.bindModelElementList(this.id);
            } else {
              this.router.navigate([
                `/${AssessmentRouteConstants.DASHBOARD_MODULE}`,
              ]);
            }
          },
          (error) => {
            this.isLoadingModelResults = false;
            this.isLoadingModelElementsResults = false;
            this.router.navigate([
              `/${AssessmentRouteConstants.DASHBOARD_MODULE}`,
            ]);
          }
        );
      }
    });
  }

  bindAssessmentModel = (id, isLoading = true) => {
    this.isLoadingModelResults = true;
    this.modelData = null;
    this.getAssessmentModel(id, isLoading).subscribe(
      (response) => {
        this.modelData = response.payload.model;
        this.isLoadingModelResults = false;
      },
      (error) => {
        this.isLoadingModelResults = false;
      }
    );
  }

  getAssessmentModel = (id, isLoading = true) => {
    return this.assessmentModelService.getAssessmentModelElementDetail(id, isLoading);
  }

  onCopyAssessmentModel = (assessmentModel) => {
    this.dialogRef = this.dialog.open(AssessmentModelCopyDialogComponent, {
      width: "500px",
      data: { assessmentModel },
    });

    const sub = this.dialogRef.componentInstance.modelSave.subscribe(
      (event) => {
        const params = event.params;
        params.model_id = assessmentModel._id;
        this.cloneAssessmentModel(params).subscribe(
          (response) => {
            if (this.dialogRef) {
              this.dialogRef.close({ submit: true });
            }
          },
          (error) => { }
        );
      }
    );

    this.dialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        this.router.navigate([
          `/${AssessmentRouteConstants.MODEL_LIST}`,
        ]);
      }
      if (sub) {
        sub.unsubscribe();
      }
    });
  };

  cloneAssessmentModel = (params): Observable<any> => {
    return this.assessmentModelService.cloneAssessmentModel(params);
  };

  onActiveInActiveModel = () => {
    this.modelStatusUpdateDialogRef = this.dialog.open(ActivateModelRulesDialogComponent, {
      width: "500px",
    });

    this.modelStatusUpdateDialogRef.componentInstance.modelData = this.modelData;

    this.sub = this.modelStatusUpdateDialogRef.componentInstance.confirm.subscribe(
      (confirm) => {
        if (confirm) {
          this.updateModelStatus(this.modelData.is_published);
        }
      }
    );

    this.modelStatusUpdateDialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        this.modelData.is_published = !this.modelData.is_published
      }
    });
  };

  updateModelStatus = (currentStatus) => {
    const params = {
      is_published: !currentStatus
    }
    this.assessmentModelService.updateModelStatus(this.modelData._id, params).subscribe(
      (response) => {
        if (this.modelStatusUpdateDialogRef) {
          this.modelStatusUpdateDialogRef.close({
            submit: true,
            is_published: response.payload.is_published
          });
        }
      },
      (error) => { }
    );
  };

  onDeleteConfirmation(assessmentModel: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: "Are you sure want to delete this assessment model?",
        title: "Delete Assessment Model",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        this.deleteAssessmentModel(assessmentModel._id).subscribe(
          (response) => {
            this.router.navigate([
              `/${AssessmentRouteConstants.MODEL_LIST}`,
            ]);
          }
        );
      }
    });
  }

  onUpdateModelElementList = (event) => {
    if (event) {
      this.bindModelElementList(this.id);
    }
  };

  onShouldUpdateModelDetail = (event) => {
    if (event) {
      this.bindAssessmentModel(this.id)
    }
  };

  bindModelElementList = (modelId) => {
    this.modelElementList = [];
    this.isModelElementListUpdated = false;
    this.isLoadingModelElementsResults = true;
    if (this.listAssessmentModelElementsSubscription$) {
      this.listAssessmentModelElementsSubscription$.unsubscribe();
    }
    this.listAssessmentModelElementsSubscription$ = this.getAssessmentModelElementList(modelId).subscribe(
      (response) => {
        this.handleAssessmentModelElementResponse(response);
      },
      (error) => {
        this.isLoadingModelElementsResults = false;
      }
    );
  };

  handleAssessmentModelElementResponse = (response) => {
    this.isLoadingModelElementsResults = false;
    this.modelElementList = response.payload.data;
    this.isModelElementListUpdated = true;
  };

  getAssessmentModelElementList = (modelId): Observable<any> => {
    const params = { model_id: modelId };
    return this.assessmentModelService.getAssessmentModelElementList(params);
  };

  get isModelHaveElement() {
    return this.modelElementList.length > 0;
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent) => {
    this.modelDetailTab.selectedIndex = tabChangeEvent.index
  };

  onCriteriaFromThirdStepUpdate = (event) => {
    this.isCriteriaUpdate = true;
    this.bindAssessmentModel(this.id);
  };

  deleteAssessmentModel = (id): Observable<any> => {
    return this.assessmentModelService.deleteAssessmentModel(id);
  };

  onUpdateModelData = (event) => {
    // const { modelData } = event;
    // this.modelData = { ...this.modelData, ...modelData }
    this.bindAssessmentModel(this.modelData._id, false);
  }
}
