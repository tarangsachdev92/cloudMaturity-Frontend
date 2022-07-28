import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBaseComponent } from "@app/utility";

@Component({
  selector: "app-add-action-plan-dialog",
  templateUrl: "./add-action-plan-dialog.component.html",
  styleUrls: ["./add-action-plan-dialog.component.scss"],
})
export class AddActionPlanDialogComponent
  extends FormBaseComponent
  implements OnInit {
  // Form Group variables
  actionPlanForm: FormGroup;
  actions: FormArray;

  @Input() criteria = [];
  @Input() action;
  @Input() userList = [];
  @Output() submit = new EventEmitter<any>();

  constructor(
    fb: FormBuilder,
    public dialogRef: MatDialogRef<AddActionPlanDialogComponent>
  ) {
    super(fb);
  }

  ngOnInit() {
    this.initialize();
  }

  initialize = () => {
    this.createActionPlanForm(this.action);
  };

  createActionPlanForm = (action) => {
    this.actionPlanForm = this.createForm({
      actions: this._fb.array([this.createActionPlan(action)]),
    });
  };

  createActionPlan(action): FormGroup {
    return this._fb.group({
      description: [action && action.description, [
        
      ]],
      criteria_id: [action && action.criteria_id, []],
      assigned_to: [action && action.assigned_to && action.assigned_to._id, []],
      due_date: [action && action.due_date, []],
    });
  }

  onSubmitActionPlanForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.submit.emit({ isSubmit: true, params: { ...form.value } });
    }
  };

  onCancelClick = () => {
    this.submit.emit({ isSubmit: false });
  };

  onAddActionPlan = () => {
    this.actions = this.actionPlanForm.get("actions") as FormArray;
    this.actions.push(this.createActionPlan(this.action));
  };

  onRemoveActionPlan = (index) => {
    const actionPlan = this.actionPlanForm.get("actions") as FormArray;
    actionPlan.removeAt(index);
  };

  getActionPlanControls = () => {
    return (this.actionPlanForm.get("actions") as FormArray).controls;
  };

  get title() {
    return `${this.action ? "Edit" : "Create"} Action Plan`;
  }
}
