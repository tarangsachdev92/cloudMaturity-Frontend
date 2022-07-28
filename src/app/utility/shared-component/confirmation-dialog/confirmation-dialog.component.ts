import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  message = 'Are you sure want to delete?';
  title = 'Delete Item';
  @Output() confirm = new EventEmitter<any>();
  @Input() shouldCloseFromDialog = true;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
    if (this.data && this.data.message) {
      this.message = this.data.message
    }
    if (this.data && this.data.title) {
      this.title = this.data.title
    }
  }

  onCloseDialog(submit = true): void {
    if (submit) {
      this.confirm.emit({ submit })
    }
    if (this.shouldCloseFromDialog) {
      this.dialogRef.close({ submit });
    }
  }
}
