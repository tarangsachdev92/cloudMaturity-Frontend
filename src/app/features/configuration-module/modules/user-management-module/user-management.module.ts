import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserManagementRoutingModule } from "./user-management-routing.module";
import { UtilityModule } from "@app/utility";
import { MaterialModule } from "@app/material";
import { userManagementComponents } from "./components/component-export";
import { UserManagementService } from "./services";
import { NzTreeSelectModule } from "ng-zorro-antd/tree-select";

@NgModule({
  declarations: [...userManagementComponents],
  imports: [
    CommonModule,
    UtilityModule,
    MaterialModule,
    NzTreeSelectModule,
    UserManagementRoutingModule,
  ],
  providers: [UserManagementService]
})
export class UserManagementModule {}
