import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PartnerRoutingModule } from "./partner-routing.module";
import { MaterialModule } from "@app/material";
import { UtilityModule } from "@app/utility";
import { partnerComponents } from "./components/partner.component.export";
import { PartnerService } from "./services";
import { AddContactDialogComponent } from "./components/add-contact-dialog/add-contact-dialog.component";

@NgModule({
  declarations: [...partnerComponents, AddContactDialogComponent],
  imports: [CommonModule, MaterialModule, UtilityModule, PartnerRoutingModule],
  providers: [PartnerService],
})
export class PartnerModule {}
