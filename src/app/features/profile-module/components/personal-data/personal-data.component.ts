import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormBaseComponent, getInitials, UserProfileModel } from '@app/utility';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent extends FormBaseComponent implements OnInit {

  @Input() userDetail: UserProfileModel;
  @Output() editPersonalProfile = new EventEmitter();

  personalDetailForm: FormGroup;

  constructor(fb: FormBuilder) {
    super(fb);
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize = () => {
    this.createPersonalDetailForm();
  }

  createPersonalDetailForm = () => {
    this.personalDetailForm = this.createForm({
      fullName: [this.userDetail && this.userDetail.fullName, []],
    })
  }

  onPersonalDetailFormSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.editPersonalProfile.emit({ params: { ...form.value } });
    }
  }

  get nameInitials() {
    return getInitials(this.userDetail && this.userDetail.fullName)
  }
}
