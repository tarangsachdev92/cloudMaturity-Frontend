/**
 *
 * Author: Tarang Sachdev.
 * Date: June 01 2019 12:30 AM
 * Copyright @ 2019 Tarang Sachdev
 *
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpMethodsTypeEnum, AppLogger } from '@app/utility';
import { SharedService } from './shared.service';
import { HttpHelperService } from './http-helper.service';
import { SnackBarService } from './snackbar.service';

@Injectable()
export class APIManager extends HttpHelperService {

  constructor(_sharedService: SharedService,
    _snackBarService: SnackBarService,
    http: HttpClient) {
    super(_sharedService, http, _snackBarService);
  }

  // return authorisation header
  get Authorized_HttpOptions_JSON() {
    const authToken = this._sharedService.getToken();
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    });
    return { headers: httpOptions };
  }

  // return authorisation header
  get Authorized_HttpOptions() {
    const authToken = this._sharedService.getToken();
    const httpOptions = new HttpHeaders({
      Authorization: `${authToken}`
    });
    return { headers: httpOptions };
  }

  // return authorisation header with only content-type
  get Content_Type_Json_HttpOptions() {
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return { headers: httpOptions };
  }

  // return authorisation header with only content-type
  get Content_Type_Form_Url_HttpOptions() {
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return { headers: httpOptions };
  }

  // return authorisation header with content-type as x-www-form-urlencoded
  get Form_URL_Encoded_HttpOptions() {
    const authToken = this._sharedService.getToken();
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `${authToken}`
    });
    return { headers: httpOptions };
  }

  // return authorisation header with blob
  get Blob_HttpOptions(): any {
    const authToken = this._sharedService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `${authToken}`
      }),
      responseType: 'blob'
    };
  }

  get Blob_HttpOptions_2(): any {
    const authToken = this._sharedService.getToken();
    return {
      headers: new HttpHeaders({}),
      responseType: 'blob'
    };
  }

  /**
   * method name : overridable httpHelperMethod
   * purpose : handle loader, and call overload in parent class for getting Observable of response
   * created : Sep 24 2018 11:30 AM
   * Revision :
   */
  httpHelperMethod(methodType: HttpMethodsTypeEnum, url: string, params = {},
    httpOptions = this.Authorized_HttpOptions_JSON,
    showToast, showLoader, customMessage = '', searchParams = {}, filesObj?: any[]): Observable<any> {
    if (showLoader) {
      AppLogger(`<=====starting of api call=====> ${url}`);
      this._sharedService.setLoader(true);
    }
    if (methodType === HttpMethodsTypeEnum.POST_MULTIPART || methodType === HttpMethodsTypeEnum.PUT_MULTIPART) {
      params = this.createFormDataObject(params, filesObj);
    }
    return super.httpHelperMethod(methodType, url, params, httpOptions, showToast, showLoader, customMessage, searchParams, filesObj);
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  // /**
  //  * return formData object from filesObject

  createFormDataObject = (params, filesObj) => {
    const formData = new FormData();
    for (const obj of filesObj) {
      const imgFilesObj: File[] = obj.files;
      for (const fileObj of imgFilesObj) {
        formData.append(obj.reqKey, fileObj, fileObj.name);
      }
    }
    if (params && (Object.keys(params).length)) {
      for (const docKey in params) {
        if (typeof params[docKey] === 'object') {
          formData.append(docKey, JSON.stringify(params[docKey]));
        } else {
          formData.append(docKey, params[docKey]);
        }
      }
    }
    return formData;
  };
}
