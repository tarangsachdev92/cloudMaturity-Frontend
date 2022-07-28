import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent } from '@app/utility';

@Component({
  selector: 'app-criteria-attachment-details-dialog',
  templateUrl: './criteria-attachment-details-dialog.component.html',
  styleUrls: ['./criteria-attachment-details-dialog.component.scss'],
})
export class CriteriaAttachmentDetailsDialogComponent extends FormBaseComponent implements OnInit {
  // Form Group variables
  attachmentForm: FormGroup;
  removeAttachmentDialogRef;

  uploadedFiles = [];

  @Input() criteria;
  @Output() attachmentUpload = new EventEmitter<any>();

  constructor(
    fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CriteriaAttachmentDetailsDialogComponent>
  ) {
    super(fb);
  }

  ngOnInit() {
    this.initialize();
  }

  initialize = () => {
    this.createAttachmentForm();
  }

  createAttachmentForm = () => {
    this.attachmentForm = this.createForm({
      attachment: ['', []],
    });
  }

  onSubmitAttachmentForm = (form: FormGroup) => {
    // if (this.onSubmit(form)) {
    this.attachmentUpload.emit({ attachmentArray: this.uploadedFiles });
    // }
  }

  onFileSelect = (id) => {
    document.getElementById(id).click();
  }

  onAttachmentClick = (event) => {
    event.target.value = '';
  }

  onRemoveCurrentAttachment = (fileIndex) => {
    const files = [...this.uploadedFiles];
    this.uploadedFiles = files.filter((file, index) => fileIndex !== index);
  }

  onAttachmentSelection = (fileInput) => {
    this.uploadedFiles = [...this.uploadedFiles, ...fileInput.target.files];
  }

  onCloseDialog = () => {
    this.dialogRef.close();
  }
}
