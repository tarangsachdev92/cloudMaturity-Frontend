import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AssessmentModelService } from "@app/features/dashboard-module/services";
import {
  FormBaseComponent,
  ValidationConstant,
} from "@app/utility";
@Component({
  selector: "app-criteria-description-dialog",
  templateUrl: "./criteria-description-dialog.component.html",
  styleUrls: ["./criteria-description-dialog.component.scss"],
})
export class CriteriaDescriptionDialogComponent
  extends FormBaseComponent
  implements OnInit {
  // Form Group Variables
  criteriaFrom: FormGroup;
  criterias: FormArray;

  @Input() currentLevel;
  @Input() criteria;

  @Output() criteriaAddUpdate = new EventEmitter<any>();

  // Validation Constants
  validationMsg = new ValidationConstant();

  constructor(
    _fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CriteriaDescriptionDialogComponent>,
    private assessmentModelService: AssessmentModelService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.createCriteriaForm(this.criteria);
  }

  createCriteriaForm = (criteria) => {
    this.criteriaFrom = this.createForm({
      criterias: this._fb.array([this.createSubElement(criteria)]),
    });
  };

  createSubElement(criteria): FormGroup {
    return this._fb.group({
      criteria_unique_id: [
        (criteria && criteria.criteria_unique_id) || "",
        [
          Validators.required as any,
          Validators.minLength(2) as any,
          Validators.maxLength(8) as any,
        ],
      ],
      description: [
        (criteria && criteria.description) || "",
        [
          Validators.required as any,
          Validators.minLength(2) as any,
          Validators.maxLength(500) as any,
        ],
      ],
    });
  }

  onAddCriteria = () => {
    this.criterias = this.criteriaFrom.get("criterias") as FormArray;
    this.criterias.push(this.createSubElement(this.criteria));
  };

  onRemoveCriteria = (index) => {
    const criterias = this.criteriaFrom.get("criterias") as FormArray;
    criterias.removeAt(index);
  };

  submitCriteria = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      if (this.criteria) {
        params.criteria_id = this.criteria._id;
      }
      this.criteriaAddUpdate.emit({ params });
    }
  };

  onCloseDialog(submit = true): void {
    this.dialogRef.close({ submit });
  }

  get formControls() {
    return this.criteriaFrom.controls;
  }

  getCriteriaControls = () => {
    return (this.criteriaFrom.get("criterias") as FormArray).controls;
  };

  get title() {
    return `${this.criteria ? "Edit" : "Add"} Practice for Level ${this.currentLevel
      }`;
  }
}
