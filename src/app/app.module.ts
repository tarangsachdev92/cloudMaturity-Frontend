import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UtilityModule } from "@app/utility";
import { CoreModule } from "@app/core";
import { MaterialModule } from "./material";
import { CustomPreloadingStrategy } from "./custom-preloading";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    UtilityModule,
    AppRoutingModule,
  ],
  providers: [CustomPreloadingStrategy],
  bootstrap: [AppComponent],
})
export class AppModule {}
