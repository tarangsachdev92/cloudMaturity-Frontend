export class User {
  private _email: string;
  
  get email(): string {
    return this._email;
  }
  
  set email(value: string) {
    this._email = value;
  }
  
}





