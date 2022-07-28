/**
 * created mainly for code separation and this service file will handle http methods related tasks
 * Author: Tarang Sachdev.
 * Date: June 01 2019 12:30 AM
 * Copyright @ 2019 Tarang Sachdev
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HttpMethodsTypeEnum, isEmpty, AppLogger } from '@app/utility';
import { SharedService } from './shared.service';
import { SnackBarService } from './snackbar.service';

@Injectable()
export class HttpHelperService {

    constructor(protected _sharedService: SharedService,
        protected http: HttpClient,
        protected _snackBarService: SnackBarService) {
    }

    /**
     * purpose : to return Observable of any(http response,error)
     * created : June 01 2019 12:30 AM
     * Revision :
     */
    protected httpHelperMethod(methodType: HttpMethodsTypeEnum, url: string, params = {}, httpOptions,
        showToast: boolean, showLoader: boolean, customMessage: string,
        searchParams, filesObj: any) {
        return this.apiCall(methodType, url, params, httpOptions, searchParams)
            .pipe(
                tap((response: any) => {
                    this.setSnackBarMessage(response, showToast, customMessage);
                    return response || {};
                }),
                catchError(
                    this.handleError('', [])
                ),
                finalize(() => {
                    if (showLoader) {
                        AppLogger(`<=====finalize of api call=====> ${url}`);
                        this._sharedService.setLoader(false);
                    }
                })
            );
    }

    /**
     * method name : apiCall
     * purpose : Communicate with server to get api data
     * created : June 01 2019 12:30 AM
     */

    private apiCall(methodType: HttpMethodsTypeEnum, url: string, params = {}, httpOptions, searchParams = {}): Observable<any> {
        switch (methodType) {
            case HttpMethodsTypeEnum.GET:
                return this.http.get<any>(this.prepareEndpoint(url, params, searchParams), httpOptions);
                break;
            case HttpMethodsTypeEnum.POST:
            case HttpMethodsTypeEnum.POST_MULTIPART:
                return this.http.post<any>(url, params, httpOptions);
                break;
            case HttpMethodsTypeEnum.PUT:
            case HttpMethodsTypeEnum.PUT_MULTIPART:
                return this.http.put<any>(url, params, httpOptions);
                break;
            case HttpMethodsTypeEnum.DELETE:
                const options = { body: params, ...httpOptions };
                return this.http.delete(url, options);
                break;
        }
    }

    /**
     * method name : handleError
     * purpose : handler error for api call
     * created : Sep 24 2018 11:30 AM
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            // console.error(error); // log to console instead
            return throwError(error);
        };
    }

    /**
     * method name : prepareEndpoint
     * purpose : Prepare end point with query string
     * created : June 01 2019 12:30 AM
     */
    private prepareEndpoint(endPoint: string, params: any, searchParams = {}) {
        if (!isEmpty(searchParams)) {
            params.search = JSON.stringify(searchParams);
        }
        if (Object.keys(params).length) {
            if (params) {
                endPoint += '?';
            }
            let count = 0;
            for (const key in params) {
                if (params.hasOwnProperty(key)) {
                    endPoint += (count > 0) ? `&${key}=${params[key]}` : `${key}=${params[key]}`;
                    count++;
                }
            }
        }
        return endPoint;
    }

    /**
     * method name : setSnackBarMessage
     * purpose : Set toaster
     * created : June 01 2019 12:30 AM
     */
    private setSnackBarMessage(res: any, show?: boolean, customMessage?: string) {
        const msg = customMessage || res && res.message;
        if (show && msg) {
            this._snackBarService.setSnackBarMessage(msg);
        }
    }
}
