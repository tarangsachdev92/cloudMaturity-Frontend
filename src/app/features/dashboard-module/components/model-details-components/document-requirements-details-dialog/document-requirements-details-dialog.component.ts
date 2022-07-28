import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBaseComponent, ValidationConstant } from "@app/utility";

@Component({
  selector: "app-document-requirements-details-dialog",
  templateUrl: "./document-requirements-details-dialog.component.html",
  styleUrls: ["./document-requirements-details-dialog.component.scss"],
})
export class DocumentRequirementsDetailsDialogComponent extends FormBaseComponent implements OnInit {
  // Form Group variables
  documentRequirementForm: FormGroup;

  // Data variables
  validationMsg = new ValidationConstant();

  // State variables
  isShowListOfChoice = false;

  @Input() documentRequirementData;
  @Input() levels;
  @Input() documentTypeList;
  @Input() elements;
  @Input() modelElementList = [];
  @Output() saveDocumentRequirement = new EventEmitter<any>();

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<DocumentRequirementsDetailsDialogComponent>
  ) {
    super(fb);
  }

  ngOnInit() {
    this.initialize();
  }

  initialize = () => {
    this.createDocumentRequirementForm(this.documentRequirementData || {});
  };

  createDocumentRequirementForm = (documentRequirementData: any = {}) => {
    const { name, title, type, level, required, elements } = documentRequirementData
    this.documentRequirementForm = this.createForm({
      name: [name || "", [
        Validators.minLength(2),
        Validators.maxLength(10)
      ]],
      title: [title || "", []],
      type: [type && type._id || "", []],
      level: [level || "", []],
      required: [!!required, []],
      elements: [elements && elements.map(e => e._id) || [], []],
    });
  };

  onSubmitDocumentRequirementForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.saveDocumentRequirement.emit({ params: { ...form.value } });
    }
  };

  onCloseDialog = () => {
    this.dialogRef.close();
  };

  get formControls() {
    return this.documentRequirementForm.controls;
  }

  get title() {
    return `${!this.documentRequirementData ? 'Add' : 'Edit'} Document Requirements`
  }
}
