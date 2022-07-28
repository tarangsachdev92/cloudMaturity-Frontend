import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent, ValidationConstant } from '@app/utility';

@Component({
  selector: 'app-add-assessment-procedure-document-dialog',
  templateUrl: './add-assessment-procedure-document-dialog.component.html',
  styleUrls: ['./add-assessment-procedure-document-dialog.component.scss'],
})
export class AddAssessmentProcedureDocumentDialogComponent extends FormBaseComponent implements OnInit {
  addDocumentForm: FormGroup;

  @Input() document;
  @Output() documentAddUpdate = new EventEmitter<any>();
  validationMsg = new ValidationConstant();

  constructor(fb: FormBuilder, public dialogRef: MatDialogRef<AddAssessmentProcedureDocumentDialogComponent>) {
    super(fb);
  }

  ngOnInit() {
    this.initialize();
  }

  initialize = () => {
    this.createDocumentForm(this.document);
  }

  createDocumentForm = (document) => {
    this.addDocumentForm = this.createForm({
      name: [document ? document.name : '', []],
      // identifiant: [document ? document.identifiant : '', []],
    });
  }

  onSubmitDocumentForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      this.documentAddUpdate.emit({ params });
    }
  }

  onCloseDialog = () => {
    this.dialogRef.close();
  }

  get title() {
    return `${this.document ? 'Edit' : 'Add'} Document`;
  }
}
