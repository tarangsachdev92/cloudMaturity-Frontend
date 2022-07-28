import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FormBaseComponent } from "@app/utility";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-add-contact-dialog",
  templateUrl: "./add-contact-dialog.component.html",
  styleUrls: ["./add-contact-dialog.component.scss"],
})
export class AddContactDialogComponent extends FormBaseComponent
  implements OnInit {
  // Form Variables
  contactForm: FormGroup;

  constructor(
    _fb: FormBuilder,
    public dialogRef: MatDialogRef<AddContactDialogComponent>
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.intialize();
  }

  intialize = () => {
    this.createContactForm();
  };

  createContactForm = () => {
    this.contactForm = this.createForm({
      full_name: ["", []],
      email: ["", []],
      telNo: ["", []],
    });
  };

  onSubmitContactForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
    }
  };

  onCloseDialog = () => {
    this.dialogRef.close();
  };
}
