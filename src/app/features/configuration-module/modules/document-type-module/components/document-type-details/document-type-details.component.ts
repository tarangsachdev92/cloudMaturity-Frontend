import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentRouteConstants, CommonRegexp, FormBaseComponent, ValidationConstant } from '@app/utility';
import { Subscription } from 'rxjs';
import { DocumentTypeService } from '../../services';

@Component({
  selector: 'app-document-type-details',
  templateUrl: './document-type-details.component.html',
  styleUrls: ['./document-type-details.component.scss']
})
export class DocumentTypeDetailsComponent extends FormBaseComponent implements OnInit {

  // Form Group Variables
  documentTypeForm: FormGroup;

  // Validation Constant
  validationMsg = new ValidationConstant();
  private sub$: Subscription;
  id: string;
  isLoading = false;

  constructor(_fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private documentTypeService: DocumentTypeService,
    private _router: Router) {
    super(_fb);
  }

  ngOnInit() {
    this.routeSubscribe();
    this.createDocumentTypeForm();
  }

  createDocumentTypeForm = () => {
    this.documentTypeForm = this.createForm({
      type: ['', [
        <any>Validators.required,
        <any>Validators.pattern(CommonRegexp.ALPHA_NUMERIC_SPECIAL_CHAR_REGEXP),
        <any>Validators.minLength(2),
        <any>Validators.maxLength(40),
      ]],
      description: ['', [
        <any>Validators.minLength(2),
        <any>Validators.maxLength(500)
      ]]
    });
  };

  routeSubscribe = () => {
    this.sub$ = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.isLoading = true;
        this.getDocumentType(this.id).subscribe(response => {
          const documentTypeData = response.payload.documentType;
          this.patchAssessmentTypeForm(documentTypeData);
          this.isLoading = false;
        }, error => {
          this.onDocumentTypeList();
        })
      }
    });
  }

  patchAssessmentTypeForm = (documentTypeData) => {
    if (documentTypeData) {
      const { type, description } = documentTypeData;
      this.documentTypeForm.patchValue({
        type, description
      })
    }
  }

  getDocumentType = (id) => {
    return this.documentTypeService.getDocumentType(id);
  }

  onSubmitDocumentTypeForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value }
      if (this.id) {
        this.documentTypeService.updateDocumentType(params, this.id).subscribe(response => {
          this.onDocumentTypeList();
        }, error => { })
      }
      else {
        this.documentTypeService.createDocumentType(params).subscribe(response => {
          this.onDocumentTypeList();
        }, error => { })
      }
    }
  };

  onDocumentTypeList = () => {
    this._router.navigate([`/${AssessmentRouteConstants.DOCUMENT_TYPE_LIST}`]);
  };

  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.documentTypeForm.controls;
  }

  ngOnDestroy() {
    if (this.sub$) this.sub$.unsubscribe();
  }

}
