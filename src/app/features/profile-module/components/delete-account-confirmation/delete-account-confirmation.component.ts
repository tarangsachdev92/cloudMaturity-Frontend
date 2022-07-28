import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBaseComponent } from '@app/utility';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-account-confirmation',
  templateUrl: './delete-account-confirmation.component.html',
  styleUrls: ['./delete-account-confirmation.component.scss']
})
export class DeleteAccountConfirmationComponent extends FormBaseComponent implements OnInit {

  // Form variables
  passwordForm: FormGroup;
  @Output() delete = new EventEmitter<any>();

  // State variable
  hidePassword = true;
  warningMessage = `If you delete your Account, all your data will get removed and you will be logged out.
  Enter password and click on Delete Account.`;

  constructor(public dialogRef: MatDialogRef<DeleteAccountConfirmationComponent>, fb: FormBuilder) {
    super(fb);
  }

  ngOnInit() {
    this.createPasswordForm();
  }

  createPasswordForm = () => {
    this.passwordForm = this.createForm({
      password: ['', [Validators.required as any]]
    });
  }

  onSubmitPasswordForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.delete.emit({ ...form.value })
    }
  }

  onCloseDialog = (success = false) => {
    this.dialogRef.close({ submit: false });
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.passwordForm.controls;
  }
}
