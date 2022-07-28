import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompanyModel, getInitials } from '@app/utility';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  @Input() companyDetail: CompanyModel;
  @Output() onEditProfile = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onAddProfileDetails = () => {
    this.onEditProfile.emit()
  }

  get nameInitials (){
    return getInitials(this.companyDetail.fullName)
  }
}
