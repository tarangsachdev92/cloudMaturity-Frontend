import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
// above import (SnackBarComponent from ../components/snack-bar/snack-bar.component) 
// is intentionally to avoid circular depedencies

@Injectable()

export class SnackBarService {

    private durationInSeconds = 2;
    private snackBarMessageBody: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private _snackBar: MatSnackBar) {
    }

    public setSnackBarMessage(message: any) {
        let body = null;
        if (message) {
            body = {
                message,
            };
        }
        this.snackBarMessageBody.next(body);
    }


    getSnackMessage(): Observable<any> {
        return this.snackBarMessageBody.asObservable();
    }

    initSnackBar = () => {
        this.getSnackMessage().subscribe(body => {
            if (body) {
                this.openSnackBar(body);
            }
        })
    }

    openSnackBar(body: any) {
        if (body) {
            this._snackBar.openFromComponent(SnackBarComponent, {
                duration: this.durationInSeconds * 1000,
                data: body
            });
        }
    }
}
