import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "@app/material";
import { NavbarComponent, SnackBarComponent } from "./components";
import { HttpInterceptors } from "./http-interceptors/index-Interceptor";
import {
  APIManager,
  SharedService,
  SharedUserService,
  SnackBarService,
  BreadcrumbService
} from "./services";
import { CMSAuthGuard, RoleGurad } from "./_gurads";
import { NotificationsComponent } from './components/notifications/notifications.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

@NgModule({
  imports: [CommonModule, RouterModule, InfiniteScrollModule, MaterialModule],
  declarations: [SnackBarComponent, NavbarComponent, NotificationsComponent],
  providers: [
    HttpInterceptors,
    SharedService,
    SnackBarService,
    BreadcrumbService,
    SharedUserService,
    APIManager,
    CMSAuthGuard,
    RoleGurad,
  ],
  exports: [SnackBarComponent, NavbarComponent],
  entryComponents: [SnackBarComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error("CoreModule is already loaded. Import only in AppModule");
    }
  }
}
