import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  APPStorage,
  AssessmentRouteConstants,
  EncryptionFunctions,
  ModelDetailEnum,
  RoleEnum,
  ToastStatus,
} from "@app/utility";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from "rxjs";
import { SharedUserService } from "./shared-user.service";
import { SnackBarService } from "./snackbar.service";

@Injectable()
export class SharedService extends SharedUserService {

  helper = new JwtHelperService();
  private taskCount = 0;
  private _token = "";
  private msgBody: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private snackBarMessageBody: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private isLoginRequired: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);

  constructor(
    private _router: Router,
    private _snackBarService: SnackBarService
  ) {
    super();
  }

  /* Shared Loader Param */

  getLoader(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setToken(value: string): void {
    this._token = value;
    localStorage.setItem(
      APPStorage.TOKEN,
      EncryptionFunctions.ENCRYPT_OBJ(value)
    );
  }

  getToken(): string {
    this._token = EncryptionFunctions.DECRYPT_OBJ(
      localStorage.getItem(APPStorage.TOKEN),
      APPStorage.TOKEN
    );
    return this._token;
  }

  /* Shared User Token Param */
  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUser();
  }

  getUserRole(): number {
    const decodeToken = this.isLoggedIn()
      ? this.helper.decodeToken(this.getToken())
      : undefined;
    return decodeToken && +decodeToken.role;
  }

  setLoader(val: boolean): void {
    if (val) {
      this.taskCount += 1;
    } else {
      this.taskCount -= 1;
      if (this.taskCount !== 0) {
        val = true;
      }
    }
    this.isLoading.next(val);
  }

  getToastMessage(): Observable<any> {
    return this.msgBody.asObservable();
  }

  getSnackMessage(): Observable<any> {
    return this.snackBarMessageBody.asObservable();
  }

  clearSession() {
    this.setToken(null);
    this.setUser(null);
    this.setLoginRequired(false);
    localStorage.clear();
  }

  logout(): void {
    this.clearSession();
    this._router.navigate([`/${AssessmentRouteConstants.AUTH_LOGIN}`]);
  }

  /* setting route */
  public setToastMessage(message: any, type: ToastStatus, title = "") {
    let body = null;
    if (message) {
      body = {
        message,
        type,
        title,
      };
    }
    this.msgBody.next(body);
  }
  /* Shared LoggedIn Param */

  getLoginRequired(): Observable<boolean> {
    return this.isLoginRequired.asObservable();
  }

  setLoginRequired(val: boolean): void {
    this.isLoginRequired.next(val);
  }

  isSuperAdmin() {
    return this.getUserRole() === RoleEnum.SUPER_ADMIN;
  }

}
