import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TruncatePipe, CheckEmptyPipe, PlaceNAPipe, FormatDecimalPipe } from "./pipes";
import {
  PageNotFoundComponent,
  FormBaseComponent,
  NoDataComponent,
  ConfirmationDialogComponent,
  OtpComponent,
  ReadMoreComponent,
  TableLoadingComponent,
  FormLoadingComponent,
  BreadcrumbComponent,
} from "./shared-component";
import {
  AutofocusDirective,
  DisableFormControlDirective,
  TwoDigitDecimalNumberDirective,
  OnlyNumberDirective,
} from "./shared-directive";
import { MaterialModule } from "@app/material";
import { UtilityService } from "./services";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    TruncatePipe,
    CheckEmptyPipe,
    PlaceNAPipe,
    FormatDecimalPipe,
    ReadMoreComponent,
    FormBaseComponent,
    AutofocusDirective,
    DisableFormControlDirective,
    TwoDigitDecimalNumberDirective,
    OnlyNumberDirective,
    NoDataComponent,
    ConfirmationDialogComponent,
    PageNotFoundComponent,
    OtpComponent,
    TableLoadingComponent,
    FormLoadingComponent,
    BreadcrumbComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TruncatePipe,
    CheckEmptyPipe,
    ReadMoreComponent,
    PlaceNAPipe,
    FormatDecimalPipe,
    AutofocusDirective,
    DisableFormControlDirective,
    TwoDigitDecimalNumberDirective,
    OnlyNumberDirective,
    FormBaseComponent,
    NoDataComponent,
    OtpComponent,
    ConfirmationDialogComponent,
    TableLoadingComponent,
    FormLoadingComponent,
    BreadcrumbComponent,
  ],
  providers: [UtilityService],
  entryComponents: [ConfirmationDialogComponent],
})
export class UtilityModule { }
