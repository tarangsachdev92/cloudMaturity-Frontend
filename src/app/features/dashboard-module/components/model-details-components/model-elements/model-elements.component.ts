import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { SnackBarService } from "@app/core";
import { AssessmentModelService, ElementService } from "@app/features/dashboard-module/services";
import { AssessmentModelDataModel, ConfirmationDialogComponent, ElementModel, retrieveWeight } from "@app/utility";
import { TreeNode } from "primeng/api";
import { Observable, Subscription } from "rxjs";
import { CopyElementsDialogComponent } from "../copy-elements-dialog/copy-elements-dialog.component";
import { ElementDetailsDialogComponent } from "../element-details-dialog/element-details-dialog.component";
import { SubElementDetailsDialogComponent } from "../sub-element-details-dialog/sub-element-details-dialog.component";

@Component({
  selector: "app-model-elements",
  templateUrl: "./model-elements.component.html",
  styleUrls: ["./model-elements.component.scss"],
})
export class ModelElementsComponent implements OnInit, OnChanges {

  @Output() shouldUpdateList = new EventEmitter<any>();
  @Output() shouldUpdateModelDetail = new EventEmitter<boolean>();
  @Input() modelData: AssessmentModelDataModel;
  @Input() isModelElementListUpdated: boolean;
  @Input() isLoadingModelElements: boolean;
  @Input() modelElementList = [];
  @Input() isModelReference: boolean;

  // Form Control variables
  searchElementFormControl: FormControl = new FormControl();

  // Data related variables
  files: TreeNode[];
  data = [];
  updateWeightArray = [];
  originalAssessmentModelElementList = [];
  displayAssessmentModelElementList = [];
  dialogCopyElementRef;
  dialogAddElementRef;
  dialogAddSubElementRef;
  copyModelElementList = [];
  allElementList = [];
  allElementCopyList = [];
  // Subscribe variables
  private deleteElementSubscription$: Subscription;

  // State variables
  isFilterShow = false;
  isEditWeight = false;

  constructor(
    private _assessmentModelService: AssessmentModelService,
    private _elementService: ElementService,
    private _snackBarService: SnackBarService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.modelElementList) {
      const change = changes.modelElementList;
      if (change.currentValue) {
        const modelElementList = change.currentValue
        this.bindModelElementList(modelElementList);
        this.bindAllModelElementList(modelElementList)
      }
    }
  }

  filterToggle = () => {
    this.isFilterShow = !this.isFilterShow;
  };

  toggleEditWeight = () => {
    if (this.isEditWeight) {
      if (this.updateWeightArray.length > 0) {
        const params = {
          weights: this.updateWeightArray,
        };
        this.addElementsWeight(params).subscribe(
          (response) => {
            this.updateWeightArray = [];
            this.isEditWeight = !this.isEditWeight;
            this.updateElementList(false);
          },
          (error) => { }
        );
      } else {
        this.isEditWeight = !this.isEditWeight;
      }
    } else {
      this.isEditWeight = !this.isEditWeight;
    }
  };

  bindModelElementList = (elementList = []) => {
    this.originalAssessmentModelElementList = JSON.parse(
      JSON.stringify(elementList)
    );
    this.bindCopyElementList();
    this.filterElementList();
    this.data = [];
    this.prepareArray(this.data, this.displayAssessmentModelElementList);
  };

  bindAllModelElementList = (modelElementList) => {
    this.allElementList = [];
    this.prepareAllElementList(
      this.allElementList,
      JSON.parse(JSON.stringify(modelElementList))
    );
    this.allElementCopyList = JSON.parse(JSON.stringify(this.allElementList))
  }

  prepareAllElementList = (arr, arrList) => {
    for (const element of arrList) {
      const data = element;
      const subElements = element.subElements || [];
      subElements.forEach(el => {
        el.parentElementId = data._id
      });
      arr.push({ ...data });
      if (subElements && subElements.length) {
        this.prepareAllElementList(arr, subElements);
      }
    }
  };

  addElementsWeight = (params): Observable<any> => {
    return this._assessmentModelService.addElementsWeight(params);
  };

  modelWeightChange = (event, assessmentModelElement) => {
    const index = this.allElementList.findIndex(
      (elem) => elem._id === assessmentModelElement._id
    );
    const weight = event.target.value || "";
    if (weight === "") {
      this.updateWeightArray = this.updateWeightArray.filter(
        (elem) => elem.model_element_id !== assessmentModelElement._id
      );
      return false;
    }

    if (this.allElementCopyList.length >= index + 1) {
      this.allElementCopyList[index].weight = weight;
    }

    const updateWeightArrIndex = this.updateWeightArray.findIndex(
      (elem) => elem.model_element_id === assessmentModelElement._id
    );
    if (updateWeightArrIndex > -1) {
      this.updateWeightArray[updateWeightArrIndex].weight = weight;
      return false;
    }
    this.updateWeightArray.push({
      model_element_id: assessmentModelElement._id,
      weight,
    });
  };

  prepareArray = (arr, arrList) => {
    let index = 0;
    for (const element of arrList) {
      const data = element;
      data.index = index;
      element.children = [];
      const { subElements } = element;
      arr.push({ data, children: element.children });
      index++;
      if (subElements && subElements.length) {
        this.prepareArray(element.children, subElements);
      }
    }
  };

  filterElementList() {
    // without type info
    const filterValue: string = this.searchElementFormControl.value || "";
    const modelList = JSON.parse(JSON.stringify(this.originalAssessmentModelElementList));
    this.displayAssessmentModelElementList = modelList.filter(
      (elem) => {
        const elementName: string = elem.element_name.toLowerCase();
        return elementName.indexOf(filterValue.toLowerCase()) > -1;
      }
    );
    this.data = [];
    this.prepareArray(this.data, this.displayAssessmentModelElementList);
  }

  onCheckChangeSelectAll = (event) => {
    this.checkUncheckAll(this.data, event);
  };

  checkUncheckAll = (data, event) => {
    this.allElementCopyList.forEach(e => e.checked = event.checked);
    for (const element of data) {
      element.data.checked = event.checked;
      const { children } = element;
      if (children && children.length) {
        this.checkUncheckAll(children, event);
      }
    }
  };

  onCheckChangeSingle = (event, rowNode) => {
    const { _id: elementId } = rowNode.node.data;
    rowNode.node.data.checked = event.checked;
    const elementIndex = this.allElementCopyList.findIndex(
      (elem) => elem._id === elementId
    );
    this.allElementCopyList[elementIndex].checked = event.checked;
  };

  onCopyElements(): void {
    this.dialogCopyElementRef = this.dialog.open(CopyElementsDialogComponent, {
      width: "500px",
      data: { modelId: this.modelData._id },
    });

    this.dialogCopyElementRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        this.updateElementList(true);
      }
    });
  }

  bindCopyElementList = () => {
    this.copyModelElementList = JSON.parse(
      JSON.stringify(this.originalAssessmentModelElementList)
    );
  };

  isAllChecked = () => {
    return this.allElementCopyList.every((elem) => elem.checked);
  };

  get isElementSelected() {
    return this.allElementCopyList.some((elem) => elem.checked);
  };

  onDeleteMultipleElements = () => {
    const elementsToBeRemoved = this.allElementCopyList.filter((elem) => elem.checked);
    if (elementsToBeRemoved.length) {
      this.onDeleteConfirmation(elementsToBeRemoved.map((elem) => elem._id));
    } else {
      this._snackBarService.setSnackBarMessage(
        `Please select at least one element to delete.`
      );
    }
  };

  onDeleteConfirmation(elementIdsArray = []): void {
    const isMultipleElement = elementIdsArray.length > 1;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: `Are you sure want to delete ${isMultipleElement ? "these" : "this"
          } element${isMultipleElement ? "s" : ""}?`,
        title: `Delete Domain${isMultipleElement ? "s" : ""}`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        if (this.deleteElementSubscription$) {
          this.deleteElementSubscription$.unsubscribe();
        }
        this.deleteElementSubscription$ = this.deleteElements(
          elementIdsArray
        ).subscribe((response) => {
          this.updateElementList(true);
        });
      }
    });
  }

  onAddElement = (element: ElementModel = null): void => {
    this.dialogAddElementRef = this.dialog.open(ElementDetailsDialogComponent, {
      width: "950px",
      data: { element },
    });

    const sub = this.dialogAddElementRef.componentInstance.elementSave.subscribe(
      (event) => {
        const params = event.params;
        if (element) {
          const { elements } = params;
          const newParams = elements[0];
          this.updateElement(element._id, newParams).subscribe(
            (response) => {
              // const updatedElement = response.payload.element;
              // const elementIndex = this.originalAssessmentModelElementList.findIndex(
              //   (elem) => elem._id === element._id
              // );
              // const elements = JSON.parse(
              //   JSON.stringify(this.originalAssessmentModelElementList)
              // );
              // elements[elementIndex] = { ...elements[elementIndex], ...updatedElement };
              this.onSaveElementSuccess();
            },
            (e) => { }
          );
        } else {
          params.model_id = this.modelData._id;
          this.createElement(params).subscribe(
            (response) => {
              // const createdElements = response.payload.elements;
              // const elements = JSON.parse(
              //   JSON.stringify(this.originalAssessmentModelElementList)
              // );
              // elements.push(...createdElements);
              this.onSaveElementSuccess(true);
            },
            (e) => { }
          );
        }
      }
    );

    this.dialogAddElementRef.afterClosed().subscribe((result) => {
      sub.unsubscribe();
    });
  };

  onAddSubElement = (parentElement, subElement: ElementModel = null): void => {
    let warningMessage = "";
    if (parentElement && parentElement.criterias) {
      warningMessage = `Adding sub domain for ${parentElement.element_name}, all criteria will be deleted`;
    }
    this.dialogAddSubElementRef = this.dialog.open(
      SubElementDetailsDialogComponent,
      {
        width: "950px",
        data: { element: subElement, warningMessage },
      }
    );

    const sub = this.dialogAddSubElementRef.componentInstance.subElementSave
      .subscribe((event) => {
        const params = event.params;
        if (subElement) {
          const { elements } = params;
          const newParams = elements[0];

          this.updateSubElement(subElement._id, newParams).subscribe(
            (_) => {
              this.onSaveSubElementElementSuccess();
            }, (e) => { }
          );
        } else {
          params.parent_element_id = parentElement._id;
          this.createSubElement(params).subscribe(
            (_) => {
              this.onSaveSubElementElementSuccess(true);
            }, (e) => { }
          );
        }
      }
      );

    this.dialogAddSubElementRef.afterClosed().subscribe((result) => {
      sub.unsubscribe();
    });
  };

  onSaveElementSuccess = (isAdd = false) => {
    this.updateElementList(isAdd);
    if (this.dialogAddElementRef) {
      this.dialogAddElementRef.close({ submit: true });
    }
  };

  onSaveSubElementElementSuccess = (isNewAdded = false) => {
    this.updateElementList(isNewAdded);
    if (this.dialogAddSubElementRef) {
      this.dialogAddSubElementRef.close({ submit: true });
    }
  };

  updateElementList = (updateModelDetail) => {
    if (updateModelDetail) {
      this.shouldUpdateModelDetail.emit(true)
    }
    this.shouldUpdateList.emit(true);
  };

  createElement = (id): Observable<any> => {
    return this._elementService.createElement(id);
  };

  updateElement = (id, params): Observable<any> => {
    return this._elementService.updateElement(id, params);
  };

  updateSubElement = (id, params): Observable<any> => {
    return this._elementService.updateElement(id, params);
  };

  createSubElement = (params): Observable<any> => {
    return this._elementService.createSubElement(params);
  };

  deleteElements = (elementIdsArray: string[]): Observable<any> => {
    return this._elementService.deleteAssessmentModelElementSubElement(
      this.modelData._id,
      { elements: elementIdsArray }
    );
  };

  onEditElement = (event, element: ElementModel) => {
    event.stopPropagation();
    if (element.ischild_element) {
      this.onAddSubElement(null, element);
    } else {
      this.onAddElement(element);
    }
  };

  onDeleteElement = (element: AssessmentModelDataModel) => {
    this.onDeleteConfirmation([element._id]);
  };

  getWeight = (weight) => {
    return retrieveWeight(weight);
  };
}
