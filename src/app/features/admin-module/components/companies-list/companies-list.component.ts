import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AdminService } from '../../services';
import { PagerModel, CompanyStatusEnum, CompanyModel, PAGE_SIZE_OPTIONS } from '@app/utility';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, startWith, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {

  // State Variables
  isApprove = true;

  companyList: CompanyModel[] = [];

  pageSizeOptions = PAGE_SIZE_OPTIONS;

  pager: PagerModel = { page: 1, recordsPerPage: this.pageSizeOptions[0], totalRecords: 0, filteredRecords: 0 };
  searchFormControl: FormControl = new FormControl('');
  companyStatusEnum = CompanyStatusEnum;
  sortKey = 'name';
  sortOrder = '-1';

  isLoadingResults = true;

  constructor(private _adminService: AdminService) { }

  ngOnInit() {
    this.initSearch();
    // this.bindCompanies()
  }

  initSearch = () => {
    this.searchFormControl.valueChanges.pipe(
      startWith({}),
      debounceTime(500),
      switchMap(() => {
        this.isLoadingResults = true;
        this.pager.page = 1;
        this.companyList = [];
        return this.getCompanies().pipe(
          catchError((error) => {
            this.isLoadingResults = false;
            return throwError(error);
          })
        );
      })
    ).subscribe((data) => this.handleCompaniesResponse(data));
  }

  bindCompanies = () => {
    this.getCompanies().subscribe(response => {
      this.companyList = response['payload']['data'];
      this.pager = response['payload']['pager'];
    }, error => {
    })
  }

  handleCompaniesResponse = (response) => {
    this.isLoadingResults = false;
    this.companyList = response['payload']['data'];
    this.pager = response['payload']['pager'];
  }

  companyApproval = (status, email) => {
    const params = {
      status, email
    }
    this.approveRejectompany(params).subscribe(response => {
      this.bindCompanies();
    }, error => {

    })
  }

  getCompanies = (): Observable<any> => {
    return this._adminService.getCompniesList(this.apiParams)
  }

  approveRejectompany = (params): Observable<any> => {
    return this._adminService.approveRejectCompany(params)
  }

  get apiParams() {
    const { page, recordsPerPage } = this.pager;
    const search = this.searchFormControl.value;
    const sort = {};
    sort[this.sortKey] = this.sortOrder;
    const params = { page, recordsPerPage, sort: JSON.stringify(sort) };
    if (search) {
      params['search'] = search;
    }
    return params
  }

  onClickSort(sortField, sortOrder) {
    this.sortKey = sortField;
    this.sortOrder = sortOrder;
    this.bindCompanies();
  }

  pageChange = (page: any) => {
    this.pager.page = page.pageIndex + 1;
    this.pager.recordsPerPage = page.pageSize;
    this.bindCompanies()
  }

}
