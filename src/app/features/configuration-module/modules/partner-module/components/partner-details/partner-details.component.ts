import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBaseComponent,
  ValidationConstant,
  CommonRegexp,
  AssessmentRouteConstants,
  PartnerModel,
} from "@app/utility";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { PartnerService } from "../../services";
import { MatDialog } from "@angular/material/dialog";
import { AddContactDialogComponent } from "../add-contact-dialog/add-contact-dialog.component";

@Component({
  selector: "app-partner-details",
  templateUrl: "./partner-details.component.html",
  styleUrls: ["./partner-details.component.scss"],
})
export class PartnerDetailsComponent extends FormBaseComponent
  implements OnInit, OnDestroy {
  // Form Group Variables
  partnerForm: FormGroup;

  // Validation Constant
  validationMsg = new ValidationConstant();
  private sub: any;
  id: number;
  isLoading = false;

  constructor(
    _fb: FormBuilder,
    private route: ActivatedRoute,
    private _partnerService: PartnerService,
    public dialog: MatDialog,
    private _router: Router
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.createPartnerForm();
    this.routeSubscribe();
  }

  createPartnerForm = () => {
    this.partnerForm = this.createForm({
      partner_name: [
        "",
        [
          <any>Validators.required,
          <any>Validators.pattern(CommonRegexp.ALPHA_NUMERIC_REGEXP),
          <any>Validators.minLength(2),
          <any>Validators.maxLength(50),
        ],
      ],
      email: [
        "",
        [
          <any>Validators.required,
          <any>Validators.pattern(CommonRegexp.EMAIL_ADDRESS_REGEXP),
          <any>Validators.minLength(6),
          <any>Validators.maxLength(50),
        ],
      ],
      telNo: ["", []],
      description: ["", []],
    });
  };

  routeSubscribe = () => {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params["id"];
      if (this.id) {
        this.isLoading = true;
        this.getPartner(this.id).subscribe(
          (response) => {
            const userData = response["payload"]["data"];
            this.patchUserForm(userData);
            this.isLoading = false;
          },
          (error) => {
            this.onPartnerList();
          }
        );
      }
      // In a real app: dispatch action to load the details here.
    });
  };

  patchUserForm = (partnerData: PartnerModel) => {
    const { partner_name, email } = partnerData;
    this.partnerForm.patchValue({
      partner_name,
      email,
    });
  };

  getPartner = (id) => {
    return this._partnerService.getPartner(id);
  };

  onSubmitPartnerForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      if (this.id) {
        params["_id"] = this.id;
        this._partnerService.updatePartner(params).subscribe(
          (response) => {
            this.onPartnerList();
          },
          (error) => {}
        );
      } else {
        this._partnerService.createPartner(params).subscribe(
          (response) => {
            this.onPartnerList();
          },
          (error) => {}
        );
      }
    }
  };

  onPartnerList = () => {
    this._router.navigate(["/" + AssessmentRouteConstants.PARTNER_LIST]);
  };

  onAddContactDialog(): void {
    const dialogRef = this.dialog.open(AddContactDialogComponent, {
      width: "500px",
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  get title() {
    return `${this.id ? "Edit" : "Add"} Partner`;
  }
  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.partnerForm.controls;
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
