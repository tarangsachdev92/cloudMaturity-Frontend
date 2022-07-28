import { MaterialModule } from "@app/material";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UtilityModule } from "@app/utility";

import { OrganisationRoutingModule } from "./organisation-routing.module";
import { organisationComponents } from "./components/component-export";
import { OrganisationService } from "./services";
import { PrimeNgModule } from "@app/primeNg";

@NgModule({
  declarations: [...organisationComponents],
  imports: [
    CommonModule,
    UtilityModule,
    MaterialModule,
    PrimeNgModule,
    OrganisationRoutingModule,
  ],
  providers: [OrganisationService],
})
export class OrganisationModule {}
