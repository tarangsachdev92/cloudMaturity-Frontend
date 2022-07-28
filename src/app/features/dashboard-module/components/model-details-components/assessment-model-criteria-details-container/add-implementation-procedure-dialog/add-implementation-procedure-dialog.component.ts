import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AssessmentModelService } from '@app/features/dashboard-module/services';
import { ConfirmationDialogComponent, FormBaseComponent, ValidationConstant } from '@app/utility';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-implementation-procedure-dialog',
  templateUrl: './add-implementation-procedure-dialog.component.html',
  styleUrls: ['./add-implementation-procedure-dialog.component.scss'],
})
export class AddImplementationProcedureDialogComponent extends FormBaseComponent implements OnInit {
  addTaskForm: FormGroup;

  @Input() task;
  @Output() taskAddUpdate = new EventEmitter<any>();
  validationMsg = new ValidationConstant();

  complexities = [1, 2, 3, 4, 5];
  uploadedFiles = [];
  alreadyUploadedAttachment = [];
  removeDocumentDialogRef;

  constructor(
    fb: FormBuilder,
    public dialog: MatDialog,
    private assessmentModelService: AssessmentModelService,
    public dialogRef: MatDialogRef<AddImplementationProcedureDialogComponent>
  ) {
    super(fb);
  }

  ngOnInit() {
    this.initialize();
  }

  initialize = () => {
    this.createTaskForm(this.task);
    if (this.task) {
      this.alreadyUploadedAttachment = this.task.documents || [];
    }
  }

  createTaskForm = (task) => {
    this.addTaskForm = this.createForm({
      // unique_id: [task ? task.unique_id : '', []],
      description: [task ? task.description : '', []],
      // complexity: [task ? task.complexity : '', []],
      // cost: [task ? task.cost : '', []],
      // duration: [task ? task.duration : '', []],
      // documents: ['', []],
    });
  }

  onSubmitTaskForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      delete params.documents;
      this.taskAddUpdate.emit({
        params,
        documentArray: this.uploadedFiles,
      });
    }
  }

  onFileSelect = (id) => {
    document.getElementById(id).click();
  }

  deleteAttachment = (documentId, taskId): Observable<any> => {
    return this.assessmentModelService.deleteTaskAttachment(taskId, documentId);
  }

  onRemoveAlreadyUploadedAttachment = (
    attachment,
    attachmentIndex,
    task
  ) => {
    this.removeDocumentDialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure want to delete this document?',
        title: 'Delete Document',
      },
    });

    this.removeDocumentDialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        this.deleteAttachment(attachment._id, task._id).subscribe(
          (response) => {
            if (this.task) {
              this.alreadyUploadedAttachment.splice(attachmentIndex, 1);
            }
          }
        );
      }
    });
  }

  onAttachmentClick = (event) => {
    event.target.value = '';
  }

  onRemoveCurrentAttachment = (fileIndex) => {
    const files = [...this.uploadedFiles];
    this.uploadedFiles = files.filter((file, index) => fileIndex !== index);
  }

  onDocumentsSelection = (fileInput) => {
    this.uploadedFiles = [...this.uploadedFiles, ...fileInput.target.files];
  }

  onCloseDialog = () => {
    this.dialogRef.close();
  }

  get formControls() {
    return this.addTaskForm.controls;
  }

  get title() {
    return `${this.task ? 'Edit' : 'Add'} Task`;
  }
}
