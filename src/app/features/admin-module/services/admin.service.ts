import { Injectable } from '@angular/core';
import { APIManager } from '@app/core';
import { Observable } from 'rxjs';
import { HttpMethodsTypeEnum, AssessmentApi } from '@app/utility';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _apiManager: APIManager) { }

  getCompniesList = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.GET, AssessmentApi.COMPANY, params,
      this._apiManager.Content_Type_Json_HttpOptions, false, true);
  }

  approveRejectCompany = (params): Observable<any> => {
    return this._apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.PUT, AssessmentApi.COMPANY_APPROVED_REJECT, params,
      this._apiManager.Content_Type_Json_HttpOptions, true, true);
  }
}
