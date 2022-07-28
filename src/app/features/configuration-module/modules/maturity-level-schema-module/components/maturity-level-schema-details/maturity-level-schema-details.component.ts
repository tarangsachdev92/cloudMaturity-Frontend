import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AssessmentRouteConstants, ValidationConstant, FormBaseComponent, Levels, MaturityLevelSchemaModel, MaturityLevelSchemaDetailModel, CommonRegexp } from '@app/utility';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { MaturityLevelSchemaService } from '../../services';

@Component({
  selector: 'app-maturity-level-schema-details',
  templateUrl: './maturity-level-schema-details.component.html',
  styleUrls: ['./maturity-level-schema-details.component.scss']
})
export class MaturityLevelSchemaDetailsComponent extends FormBaseComponent implements OnInit, OnDestroy {

  // Form Group Variables
  maturityLevelSchemaForm: FormGroup;

  // Validation Constant
  validationMsg = new ValidationConstant();
  private sub: any;
  id: number;
  isLoading = false;

  constructor(_fb: FormBuilder,
    private _activeRoute: ActivatedRoute,
    private _maturityLevelSchemaService: MaturityLevelSchemaService,
    private _router: Router) {
    super(_fb);
  }

  ngOnInit() {
    this.createMaturityLevelSchemaForm();
    this.routeSubscribe();
  }

  createMaturityLevelSchemaForm = () => {
    this.maturityLevelSchemaForm = this.createForm({
      schema_name: ['', [<any>Validators.required,
      <any>Validators.pattern(CommonRegexp.ALPHA_NUMERIC_SPECIAL_CHAR_REGEXP),
      <any>Validators.minLength(2),
      <any>Validators.maxLength(40)]],
      description: ['', [
        <any>Validators.minLength(2),
        <any>Validators.maxLength(500)
      ]],
      levels: this._fb.array([])
    });
  };

  createItem(description): FormGroup {
    return this.createForm({
      description: [(description || ''), [
        <any>Validators.required,
        <any>Validators.minLength(2),
        <any>Validators.maxLength(500)
      ]]
    });
  }

  addItem(description): void {
    const levels = this.maturityLevelSchemaForm.get('levels') as FormArray;
    levels.push(this.createItem(description));
  }

  deleteItem(index) {
    const levels = this.maturityLevelSchemaForm.get('levels') as FormArray;
    levels.removeAt(index)
  }

  setLevels(data: Levels[]) {
    const levels = this.maturityLevelSchemaForm.get('levels') as FormArray;
    data.forEach(elem => {
      levels.push(this.createItem(elem.description))
    })
  }

  routeSubscribe = () => {
    this.sub = this._activeRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.isLoading = true;
        this.getMaturityLevelSchema(this.id).subscribe(response => {
          const maturityLevelSchemaData = response['payload']['data'];
          this.patchMaturityLevelSchemaForm(maturityLevelSchemaData);
          this.isLoading = false;
        }, error => {
          this.onMaturityLevelSchemaList();
        })
      } else {
        this.addItem('')
      }
      // In a real app: dispatch action to load the details here.
    });
  }

  getLevelControls = () => {
    return (this.maturityLevelSchemaForm.get('levels') as FormArray).controls;
  }

  onMaturityLevelSchemaList = () => {
    this._router.navigate(['/' + AssessmentRouteConstants.MATURITY_SCHEMA_LEVEL_LIST]);
  };

  getMaturityLevelSchema = (id): Observable<any> => {
    return this._maturityLevelSchemaService.getMaturityLevelSchema(id);
  }

  patchMaturityLevelSchemaForm = (maturityLevelSchemaData: MaturityLevelSchemaDetailModel) => {
    const { schema_name, description, levels } = maturityLevelSchemaData;
    this.maturityLevelSchemaForm.patchValue({
      schema_name, description
    })
    this.setLevels(levels)
  }

  onSubmitMaturityLevelSchemaForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      let params = {};
      try {
        params = JSON.parse(JSON.stringify(form.value))
      } catch (error) {
      }
      params['levels'] = params['levels'].map((elem, i) => {
        elem.level = i + 1;
        return elem;
      })
      if (this.id) {
        params['_id'] = this.id;
        this._maturityLevelSchemaService.updateMaturityLevelSchema(params).subscribe(response => {
          this.onMaturityLevelSchemaList();
        }, error => { })
      }
      else {
        this._maturityLevelSchemaService.createMaturityLevelSchema(params).subscribe(response => {
          this.onMaturityLevelSchemaList();
        }, error => { })
      }
    }
  };

  /**
   * convenience getter for easy access to form fields
   */
  get formControls() {
    return this.maturityLevelSchemaForm.controls;
  }

  get title() {
    return `${this.id ? 'Edit' : 'Add'} Schema`
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
