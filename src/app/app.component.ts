import { Component, OnInit, AfterViewChecked, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SharedService, SnackBarService, SvgIconService } from '@app/core';
import { environment } from '@env/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {

  title = 'cloud-maturity-assessment-frontend';

  // State Variables
  isLoggedIn = false;
  isLoading = false;
  panelMove = false;

  private loginRequiredSubscriber$: Subscription;
  private loaderSubscriber$: Subscription;

  constructor(private _sharedService: SharedService,
    private cdRef: ChangeDetectorRef,
    private _snackBarService: SnackBarService,
    private svgService: SvgIconService
  ) {
  }
  ngOnInit() {
    this.subscribeIsLoggedIn();
    this.subscribeIsLoading();
    this._snackBarService.initSnackBar();
    this.svgService.registerIcons();
  }

  subscribeIsLoggedIn() {
    this.loginRequiredSubscriber$ = this._sharedService.getLoginRequired().subscribe(() => {
      this.isLoggedIn = this._sharedService.isLoggedIn();
    });
  }

  subscribeIsLoading() {
    this.loaderSubscriber$ = this._sharedService.getLoader().subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.loaderSubscriber$) {
      this.loaderSubscriber$.unsubscribe();
    }
    if (this.loginRequiredSubscriber$) {
      this.loginRequiredSubscriber$.unsubscribe();
    }
  }
}
