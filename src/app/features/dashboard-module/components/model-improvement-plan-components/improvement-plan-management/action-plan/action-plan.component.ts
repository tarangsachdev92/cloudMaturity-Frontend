import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { CommonService } from "@app/core";
import { AssessmentImprovementPlanService } from "@app/features/dashboard-module/services";
import { actionStatuses, ConfirmationDialogComponent, FormBaseComponent } from "@app/utility";
import { Observable, Subscription } from "rxjs";
import { AddActionPlanDialogComponent } from "../add-action-plan-dialog/add-action-plan-dialog.component";

@Component({
  selector: "app-action-plan",
  templateUrl: "./action-plan.component.html",
  styleUrls: ["./action-plan.component.scss"],
})
export class ActionPlanComponent extends FormBaseComponent implements OnInit {
  @Input() improvementPlanId;
  @Input() improvementPlan;

  // Data variables
  gaugeType = "semi";
  gaugeLabel = "";
  gaugeAppendText = "%";
  gaugeSize = 140;
  gaugeThick = 9;
  gaugeClr = "rgb(214, 79, 79)";
  userList = [];
  formValueChangeSubscriber$: Subscription;
  actionStatusList = actionStatuses;
  // State variables
  isShowFilter = false;
  addActionDialogRef
  isImprovementActionPlanLoader = false;
  actionPlanData;
  improvementPlanData;
  displayActionData = [];
  filterActionForm: FormGroup;
  deleteConfirmationDialogRef;
  deleteActionSubscriber$: Subscription;

  constructor(public dialog: MatDialog,
    private commonService: CommonService,
    public _fb: FormBuilder,
    private assessmentImprovementPlanService: AssessmentImprovementPlanService) {
    super(_fb);
  }

  ngOnInit() {
    this.createFilterActionForm();
    this.formValueChangeSubscriber();
    this.bindImprovementPlanActionRelatedData();
  }

  createFilterActionForm = () => {
    this.filterActionForm = this.createForm({
      action: [''],
      criteria_id: [''],
      assigned_to: [''],
      due_date: [''],
      status: ['']
    });
  };

  formValueChangeSubscriber = () => {
    this.formValueChangeSubscriber$ = this.filterActionForm.valueChanges.subscribe(
      (value) => {
        this.filterActionData(this.actionPlanData && this.actionPlanData.actions || []);
      }
    );
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes.improvementPlanId && changes.improvementPlanId.currentValue) {
      this.bindImprovementPlanActionPlan(changes.improvementPlanId.currentValue)
    }
  }

  bindImprovementPlanActionRelatedData = () => {
    this.getUsers().subscribe(response => {
      this.userList = response.payload.data;
    }, error => { })
  }

  getUsers = () => {
    // TODO remove page:1 as a required field from the api
    const params = { page: 1, recordsPerPage: 999999 };
    return this.commonService.getUserList(params);
  };

  bindImprovementPlanActionPlan = (improvementPlanId, isLoader = true) => {
    if (isLoader) {
      this.isImprovementActionPlanLoader = true;
      this.displayActionData = [];
    }
    this.getImprovementPlanActionPlan(improvementPlanId).subscribe(response => {
      this.actionPlanData = response.payload.actionPlan;
      this.improvementPlanData = response.payload.improvementPlan;
      this.isImprovementActionPlanLoader = false;

      this.filterActionData(this.actionPlanData && this.actionPlanData.actions || []);
    }, error => {
      this.isImprovementActionPlanLoader = false;
    })
  }

  filterActionData = (actionsArray) => {
    const displayActionData = JSON.parse(JSON.stringify(actionsArray));

    this.displayActionData = displayActionData.filter(action => {
      const isActionFilter = this.formControls['action'].value ?
        action.description.toLowerCase().indexOf(this.formControls['action'].value.toLowerCase()) > -1 : true;
      const isCriteriaFilter = this.formControls['criteria_id'].value ?
        action.criteria.criteria_unique_id.toLowerCase().indexOf(this.formControls['criteria_id'].value.toLowerCase()) > -1 : true;
      const isAssignedToFilter = this.formControls['assigned_to'].value ? action.assigned_to._id === this.formControls['assigned_to'].value : true;
      const isDueDateFilter = this.formControls['due_date'].value ? new Date(action.due_date).getTime() === this.formControls['due_date'].value.getTime() : true;
      const isStatusFilter = (this.formControls['status'].value || this.formControls['status'].value === 0) ? +action.status === +this.formControls['status'].value : true;
      return isActionFilter && isCriteriaFilter && isAssignedToFilter && isStatusFilter && isDueDateFilter;
    })
  }

  getActionStatus = (action) => {
    const status = this.actionStatusList.find(e => +e.value === +action.status);
    return status && status.display;
  }

  getImprovementPlanActionPlan = (improvementPlanId) => {
    return this.assessmentImprovementPlanService.getImprovementPlanActionPlan(improvementPlanId)
  }

  generateImprovementPlanActionPlan = (improvementPlanId) => {
    return this.assessmentImprovementPlanService.generateImprovementPlanActionPlan(improvementPlanId)
  }

  onGenerateActionPlan = (improvementPlanId) => {
    if (improvementPlanId) {
      this.generateImprovementPlanActionPlan(improvementPlanId).subscribe(response => {
        this.bindImprovementPlanActionPlan(improvementPlanId)
      }, error => { })
    }
  };

  onEditAction = (action) => {
    this.onAddActionPlanDialog(action)
  }

  onAddActionPlanDialog = (action = null) => {
    this.addActionDialogRef = this.dialog.open(AddActionPlanDialogComponent, {
      panelClass: 'action-plan-full-width-dialog'
    });

    this.addActionDialogRef.componentInstance.action = action;
    this.addActionDialogRef.componentInstance.criteria = this.actionPlanData.criterias;
    this.addActionDialogRef.componentInstance.userList = this.userList;

    const sub = this.addActionDialogRef.componentInstance.submit.subscribe(
      (event) => {
        if (event) {
          const { isSubmit, params } = event;
          if (!isSubmit) {
            if (this.addActionDialogRef) {
              this.addActionDialogRef.close({ submit: false });
            }
          } else {
            if (params) {
              let newParams = { ...params };
              if (action) {
                newParams = params.actions[0];
              }
              this.saveAction(newParams, action);
            }
          }
        }
      }
    );

    this.addActionDialogRef.afterClosed().subscribe((response) => {
      if (response && response.submit) {
        this.bindImprovementPlanActionPlan(this.improvementPlanId, false)
      }
      sub.unsubscribe();
    });
  };

  saveAction = (params, action) => {
    const actionService = action ? this.updateImprovementActionService(params, this.improvementPlanId, action._id)
      : this.saveImprovementPlanActionService(params, this.improvementPlanId);

    actionService.subscribe((response) => {
      if (this.addActionDialogRef) {
        this.addActionDialogRef.close({ submit: true, action: response.payload.action, isUpdate: !!action });
      }
    }, (error) => { }
    );
  };

  onFilterToggle = () => {
    this.isShowFilter = !this.isShowFilter;
  }

  updateImprovementActionService = (params, improvementPlanId, actionId) => {
    return this.assessmentImprovementPlanService.updateImprovementAction(params, improvementPlanId, actionId);
  };

  saveImprovementPlanActionService = (params, improvementPlanId) => {
    return this.assessmentImprovementPlanService.saveImprovementPlanAction(params, improvementPlanId);
  };

  updateImprovementAction = (params, improvementPlanId, actionId) => {
    this.updateImprovementActionService(params, improvementPlanId, actionId)
      .subscribe((_) => {
        this.bindImprovementPlanActionPlan(this.improvementPlanId, false)
      }, (_) => { });
  }

  onAssignedToChange = (event, action) => {
    const { _id: actionId } = action;
    const params = { assigned_to: event };
    this.updateImprovementAction(params, this.improvementPlanId, actionId)
  };

  onDueDateChange = (event, action) => {
    const { _id: actionId } = action;
    const params = { due_date: event };
    this.updateImprovementAction(params, this.improvementPlanId, actionId)
  };

  onStatusChange = (event, action) => {
    const { _id: actionId } = action;
    const params = { status: event.checked ? 1 : 0 };
    this.updateImprovementAction(params, this.improvementPlanId, actionId)
  }

  onDeleteAction = (action) => {
    this.onDeleteActionPlanDialog(action);
  }

  onDeleteActionPlanDialog(action): void {
    this.deleteConfirmationDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: "Are you sure want to delete this action plan?",
        title: `Delete Action Plan`,
      },
    });

    const sub = this.deleteConfirmationDialogRef.componentInstance.confirm.subscribe(
      (event) => {
        if (event) {
          const { submit } = event;
          if (submit) {
            if (this.deleteActionSubscriber$) {
              this.deleteActionSubscriber$.unsubscribe();
            }
            this.deleteActionSubscriber$ = this.deleteImprovementPlanAction(this.improvementPlanId, action._id)
              .subscribe((response) => {
                this.bindImprovementPlanActionPlan(this.improvementPlanId, false)
                this.deleteConfirmationDialogRef.close();
              });
          }
        }
      }
    );
    this.deleteConfirmationDialogRef.afterClosed().subscribe((result) => {
      sub.unsubscribe();
    });
  }

  deleteImprovementPlanAction = (planId, actionId): Observable<any> => {
    return this.assessmentImprovementPlanService.deleteImprovementPlanAction(planId, actionId);
  }

  get formControls() {
    return this.filterActionForm.controls;
  }
}
