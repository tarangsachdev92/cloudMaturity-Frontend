import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AssessmentModelDataModel } from '@app/utility';
@Component({
  selector: 'app-model-basic-data-container',
  templateUrl: './model-basic-data-container.component.html',
  styleUrls: ['./model-basic-data-container.component.scss']
})
export class ModelBasicDataContainerComponent implements OnInit {

  // State variables
  isShowModelEditForm = false;
  @Input() modelData: AssessmentModelDataModel;
  @Input() isLoadingModelDetails: boolean;
  @Input() isModelReference: boolean;
  @Output() updateModelData = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onEditForm = () => {
    this.isShowModelEditForm = true;
  }

  onModalSubmit = (event) => {
    const { isSubmit, modelData } = event;
    if (isSubmit) {
      this.updateModelData.emit({ modelData })
    }
    this.isShowModelEditForm = false;
  }
}
