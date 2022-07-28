import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  AssessmentRouteConstants,
  ConfirmationDialogComponent,
  PagerModel,
  PAGE_SIZE_OPTIONS,
  UserModel,
  FormBaseComponent,
} from '@app/utility';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { startWith, debounceTime, switchMap, catchError } from 'rxjs/operators';
import { throwError, Observable, Subscription } from 'rxjs';
import { UserManagementService } from '../../../services';

@Component({
  selector: 'app-user-management-list',
  templateUrl: './user-management-list.component.html',
  styleUrls: ['./user-management-list.component.scss'],
})
export class UserManagementListComponent extends FormBaseComponent
  implements OnInit, OnDestroy {
  // State Variables
  isApprove = true;

  userList: UserModel[] = [];

  pageSizeOptions = PAGE_SIZE_OPTIONS;

  pager: PagerModel = {
    page: 1,
    recordsPerPage: this.pageSizeOptions[0],
    totalRecords: 0,
    filteredRecords: 0,
  };
  sortKey = 'fullName';
  sortOrder = '-1';

  dialogRef;

  isLoadingResults = true;

  // Form Group variables
  filterForm: FormGroup;

  private userListSubscription: Subscription;
  private searchSubscriber: Subscription;
  private deleteUserSubcription: Subscription;

  constructor(
    private _router: Router,
    public dialog: MatDialog,
    protected _fb: FormBuilder,
    private _userManagementService: UserManagementService
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.createFilterForm();
    this.initSearch();
  }

  createFilterForm = () => {
    this.filterForm = this.createForm({
      search: [''],
    });
  }

  initSearch = () => {
    this.searchSubscriber = this.filterForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap(() => {
          this.isLoadingResults = true;
          this.pager.page = 1;
          this.userList = [];
          return this.getUserList().pipe(
            catchError((error) => {
              this.isLoadingResults = false;
              return throwError(error);
            })
          );
        })
      )
      .subscribe((data) => this.handleCompaniesResponse(data));
  }

  bindUserList = () => {
    if (this.userListSubscription) { this.userListSubscription.unsubscribe(); }
    this.userListSubscription = this.getUserList().subscribe(
      (response) => {
        this.userList = response.payload.data;
        this.pager = response.payload.pager;
      },
      (error) => { }
    );
  }

  handleCompaniesResponse = (response) => {
    this.isLoadingResults = false;
    this.userList = response.payload.data;
    this.pager = response.payload.pager;
  }

  getUserList = (): Observable<any> => {
    return this._userManagementService.getUserList(this.apiParams);
  }

  deleteUser = (id): Observable<any> => {
    return this._userManagementService.deleteUser(id);
  }

  enableDisableUser = (id, status): Observable<any> => {
    return this._userManagementService.enableDisableUser(id, status);
  }

  onRowClick = () => { };

  get apiParams() {
    const { page, recordsPerPage } = this.pager;
    const search = this.filterForm.value;
    const sort = {};
    sort[this.sortKey] = this.sortOrder;
    const params = { page, recordsPerPage, sort: JSON.stringify(sort) };
    if (search) {
      params['search'] = search;
    }
    return params;
  }

  onClickSort(sortField, sortOrder) {
    this.sortKey = sortField;
    this.sortOrder = sortOrder;
    this.bindUserList();
  }

  pageChange = (page: any) => {
    this.pager.page = page.pageIndex + 1;
    this.pager.recordsPerPage = page.pageSize;
    this.bindUserList();
  }

  onEditUser = (user: UserModel) => {
    this._router.navigate(['/' + AssessmentRouteConstants.EDIT_USER, user._id]);
  }

  onAddUser = () => {
    this._router.navigate(['/' + AssessmentRouteConstants.ADD_USERS]);
  }

  onDeleteConfirmation(user: UserModel): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure want to delete this user?',
        title: 'Delete User',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result['submit']) {
        if (this.deleteUserSubcription)
          this.deleteUserSubcription.unsubscribe();
        this.deleteUserSubcription = this.deleteUser(user._id).subscribe(
          (response) => {
            this.bindUserList();
          }
        );
      }
    });
  }

  userEnableDisable = (user: UserModel) => {
    if (user._id) {
      const updatedStatus = user.isActive ? 0 : 1;
      this.enableDisableUser(user._id, updatedStatus).subscribe(
        (response) => {
          this.bindUserList();
        },
        (error) => { }
      );
    }
  }
  ngOnDestroy() {
    if (this.userListSubscription) this.userListSubscription.unsubscribe();
    if (this.searchSubscriber) this.searchSubscriber.unsubscribe();
    if (this.deleteUserSubcription) this.deleteUserSubcription.unsubscribe();
  }
}
