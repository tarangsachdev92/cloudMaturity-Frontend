import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ConfigurationRoutingModule } from "./configuration-routing.module";
import {
  ConfigurationContainerComponent,
  ConfigurationLeftNavigationComponent,
} from "./components";
import { UtilityModule } from "@app/utility";
import { MaterialModule } from "@app/material";
import { PrimeNgModule } from "@app/primeNg";
import { NzTreeSelectModule } from "ng-zorro-antd/tree-select";

@NgModule({
  declarations: [
    ConfigurationContainerComponent,
    ConfigurationLeftNavigationComponent,
  ],
  imports: [
    CommonModule,
    UtilityModule,
    MaterialModule,
    PrimeNgModule,
    NzTreeSelectModule,
    ConfigurationRoutingModule,
  ],
})
export class ConfigurationModule {}
