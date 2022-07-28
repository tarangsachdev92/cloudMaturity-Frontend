import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { documentStatus, FormBaseComponent, uploadTypes } from '@app/utility';
@Component({
  selector: 'app-documents-file-details-dialog',
  templateUrl: './documents-file-details-dialog.component.html',
  styleUrls: ['./documents-file-details-dialog.component.scss']
})
export class DocumentsFileDetailsDialogComponent extends FormBaseComponent implements OnInit {

  // Form Group variables
  documentRequirementForm: FormGroup;

  // State variables
  isShowAttachment = false;

  @Input() document;
  @Output() updateDocument = new EventEmitter<any>();
  uploadTypeList = uploadTypes;
  modelDocumentStatusList = documentStatus;
  newUploadFile;
  alreadyUploadedFile

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<DocumentsFileDetailsDialogComponent>
  ) {
    super(fb);
  }

  ngOnInit() {
    this.initialize();
  }

  initialize = () => {
    this.createDocumentRequirementForm(this.document);
    this.alreadyUploadedFile = this.document.type === 2 && this.document.document_name;
    this.isShowAttachment = this.alreadyUploadedFile;
  };

  createDocumentRequirementForm = (document) => {
    this.documentRequirementForm = this.createForm({
      type: [document && document.type || 1, []],
      link: [document && document.type === 1 ? document.link : '' || '', []],
      status: [document && document.status || 1, []],
    });
  };

  onSubmitDocumentRequirementForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value }
      let attachment;
      if (params.type === 2) {
        delete params.link;
        if (this.alreadyUploadedFile && !this.newUploadFile) {
          delete params.type;
        } else {
          attachment = this.newUploadFile;
        }
      }
      this.updateDocument.emit({ params, attachment })
    }
  };

  onFileTypeChange = (event) => {
    this.isShowAttachment = event.value === 2;
  }

  onFileSelect = (id) => {
    document.getElementById(id).click();
  }

  onDocumentClick = (event) => {
    event.target.value = '';
  }

  onDocumentsSelection = (fileInput) => {
    this.newUploadFile = fileInput.target.files[0];
  }

  onCloseDialog = () => {
    this.dialogRef.close();
  };

  onDeleteUploadFile = () => {
    this.newUploadFile = null;
  }

  get formControls() {
    return this.documentRequirementForm.controls;
  }

}
