import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-assessment-model-criteria-list',
  templateUrl: './assessment-model-criteria-list.component.html',
  styleUrls: ['./assessment-model-criteria-list.component.scss'],
})
export class AssessmentModelCriteriaListComponent {
  @Input() modelData;
  @Input() modelElementList = [];
  @Input() isModelElementListUpdated: boolean;
  @Input() isLoadingModelElements: boolean;
  @Input() isModelReference: boolean;
  @Output() criteriaCountUpdate = new EventEmitter<any>();

  currentSubElement;
  isCriteriaUpdated = false;
  isCriteriaAdded = false;
  isCriteriaRemoved = false;
  isLoadingResults = false;

  assessmentModelElementList = [];

  constructor() { }

  onCriteriaUpdate = (event) => {
    this.isCriteriaUpdated = true;
    setTimeout(() => {
      this.isCriteriaUpdated = false;
    }, 10);
  }

  onCriteriaAdd = (event) => {
    this.isCriteriaAdded = true;
    this.criteriaCountUpdate.emit(true);
    setTimeout(() => {
      this.isCriteriaAdded = false;
    }, 10);
  }

  onCriteriaRemove = (event) => {
    this.isCriteriaRemoved = true;
    this.criteriaCountUpdate.emit(true);
    setTimeout(() => {
      this.isCriteriaRemoved = false;
    }, 10);
  }

  onSelectSubElement = (event) => {
    this.currentSubElement = event.currentSubElement;
  }
}
