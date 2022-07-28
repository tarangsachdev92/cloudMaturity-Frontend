import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonRegexp, FormBaseComponent, ValidationConstant, CompanyModel } from '@app/utility';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { CommonService, SharedService } from '@app/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAccountConfirmationComponent } from '../delete-account-confirmation/delete-account-confirmation.component';
import { ProfileService } from '../../services';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent extends FormBaseComponent implements OnInit {

  // Form Group Variables
  editCompanyProfileForm: FormGroup;
  @Input() companyDetail: CompanyModel;
  @Output() editCompanyProfile = new EventEmitter();

  deleteAccountDialogRef;
  private deleteAccountSubscriber$: Subscription;

  // Validation Constant Variables
  validationMsg = new ValidationConstant();

  countries = [];
  dialCodes = [];

  constructor(
    public dialog: MatDialog,
    _fb: FormBuilder,
    private _sharedService: SharedService,
    private profileService: ProfileService,
    private _commonService: CommonService) {
    super(_fb);
  }

  ngOnInit() {
    this.createEditCompanyProfileForm(this.companyDetail);
    this.bindCompanyProfileDependentData();
  }


  bindCompanyProfileDependentData = () => {
    this.getCompanyProfileDependentData().subscribe(response => {
      this.countries = response[0].payload.data || [];
      this.dialCodes = this.countries.filter(f => f.phone_code).map(m => m.phone_code)
    })
  }

  getCompanyProfileDependentData = () => {
    return forkJoin(this.getCountries())
  }

  getCountries = () => {
    return this._commonService.getCountries();
  }

  createEditCompanyProfileForm = (companyDetail: CompanyModel) => {
    this.editCompanyProfileForm = this.createForm({
      company: [(companyDetail.company && companyDetail.company.toString()) || '', [
        <any>Validators.required,
        <any>Validators.pattern(CommonRegexp.ALPHA_NUMERIC_SPECIAL_CHAR_REGEXP),
        <any>Validators.minLength(2),
        <any>Validators.maxLength(50)
      ]],
      vat_number: [companyDetail.country && companyDetail.vat_number || '', [
      ]],
      address: [(companyDetail.address && companyDetail.address.toString()) || '', [
        <any>Validators.minLength(2),
        <any>Validators.maxLength(200)
      ]],
      country: [(companyDetail.country && companyDetail.country.toString()) || '', []],
      city: [companyDetail.city && companyDetail.city, []],
      dial_code: [companyDetail.dial_code && companyDetail.dial_code || '', []],
      phone: [(companyDetail.phone && companyDetail.phone.toString()) || '', [
        <any>Validators.pattern(CommonRegexp.PHONE_NUMBER_REGEXP),
        <any>Validators.minLength(7),
        <any>Validators.maxLength(13)
      ]],
    });
  };

  onEditCompanyProfileSubmit = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.editCompanyProfile.emit({ params: { ...form.value } });
    }
  };

  deleteAccount = (params): Observable<any> => {
    return this.profileService.deleteAccount(params);
  };

  onDeleteAccount = () => {
    this.deleteAccountDialogRef = this.dialog.open(DeleteAccountConfirmationComponent, {
      width: '500px',
      data: {}
    });

    const sub = this.deleteAccountDialogRef.componentInstance.delete.subscribe(
      (event) => {
        if (event) {
          const { password } = event;
          if (password) {
            if (this.deleteAccountSubscriber$) {
              this.deleteAccountSubscriber$.unsubscribe();
            }
            this.deleteAccountSubscriber$ = this.deleteAccount({ password }).subscribe((response) => {
              this.deleteAccountDialogRef.close({ success: true });
            });
          }
        }
      }
    );

    this.deleteAccountDialogRef.afterClosed().subscribe(({ success }) => {
      this._sharedService.logout();
      if (sub) sub.unsubscribe();
    });
  }

  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.editCompanyProfileForm.controls;
  }
}
