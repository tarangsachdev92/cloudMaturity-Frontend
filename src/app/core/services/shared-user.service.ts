import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, EncryptionFunctions, APPStorage, UserProfileModel } from '@app/utility';

@Injectable()

export class SharedUserService {

  private userFlag: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  private _user: UserProfileModel;

  getUser(): UserProfileModel {
    if (!this._user) {
      this._user = EncryptionFunctions.DECRYPT_OBJ(localStorage.getItem(APPStorage.USER));
    }
    return this._user;
  }

  setUser(value: UserProfileModel): void {
    localStorage.setItem(APPStorage.USER, EncryptionFunctions.ENCRYPT_OBJ(value));
    this._user = value;
    this.setUserDetailCall(true);
  }

  isValidUser(user: User): boolean {
    return !!(user);
  }

  /* Shared User detailChangeFlag for update status */

  setUserDetailCall(value: boolean): void {
    this.userFlag.next(value);
  }
  getUserDetailCall(): Observable<boolean> {
    return this.userFlag.asObservable();
  }
}
