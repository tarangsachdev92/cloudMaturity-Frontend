import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssessmentRouteConstants, CommonRegexp, FormBaseComponent, ValidationConstant, UserModel } from '@app/utility';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '@app/core';
import { UserManagementService } from '../../../services';

@Component({
  selector: 'app-user-management-details',
  templateUrl: './user-management-details.component.html',
  styleUrls: ['./user-management-details.component.scss']
})
export class UserManagementDetailsComponent extends FormBaseComponent implements OnInit, OnDestroy {

  // Form Group Variables
  addUserForm: FormGroup;

  roleList = [];
  // Validation Constant
  validationMsg = new ValidationConstant();
  id: number;
  private sub: any;
  isLoading = false;

  constructor(_fb: FormBuilder,
    private _commonService: CommonService,
    private route: ActivatedRoute,
    private _userManagementService: UserManagementService,
    private _router: Router) {
    super(_fb);
  }

  ngOnInit() {
    this.routeSubscribe();
    this.bindRoleList();
    this.createUserForm();
  }

  createUserForm = () => {
    this.addUserForm = this.createForm({
      fullName: ['', [
        <any>Validators.required,
        <any>Validators.pattern(CommonRegexp.ALPHA_NUMERIC_REGEXP),
        <any>Validators.minLength(2),
        <any>Validators.maxLength(50)
      ]],
      email: ['', [
        <any>Validators.required,
        <any>Validators.pattern(CommonRegexp.EMAIL_ADDRESS_REGEXP),
        <any>Validators.minLength(6),
        <any>Validators.maxLength(50)
      ]],
      role: ['', [<any>Validators.required]]
    });
  };

  routeSubscribe = () => {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.isLoading = true;
        this.getUser(this.id).subscribe(response => {
          const userData = response['payload']['data'];
          this.patchUserForm(userData);
          this.isLoading = false;
        }, error => {
          this.onUserList();
        })
      }
      // In a real app: dispatch action to load the details here.
    });
  }

  patchUserForm = (userData: UserModel) => {
    const { fullName, role, email } = userData;
    this.addUserForm.patchValue({
      fullName, role, email
    })
  }

  bindRoleList = () => {
    this.getRoleList().subscribe(response => {
      this.roleList = response['payload']['data'];
    }, error => { })
  }

  getRoleList = () => {
    return this._commonService.getRoles();
  }

  getUser = (id) => {
    return this._userManagementService.getUser(id);
  }

  onSubmitUserForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value }
      if (this.id) {
        this._userManagementService.updateUser(this.id, params).subscribe(response => {
          this.onUserList();
        }, error => { })
      }
      else {
        this._userManagementService.createUser(params).subscribe(response => {
          this.onUserList();
        }, error => { })
      }
    }
  };

  onUserList = () => {
    this._router.navigate(['/' + AssessmentRouteConstants.USERS_LIST]);
  };

  get title() {
    return `${this.id ? 'Edit' : 'Add'} User`
  }
  
  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.addUserForm.controls;
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
