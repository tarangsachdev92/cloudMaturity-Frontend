import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AssessmentModelDataModel } from '@app/utility';

@Component({
  selector: 'app-basic-model-details-view',
  templateUrl: './basic-model-details-view.component.html',
  styleUrls: ['./basic-model-details-view.component.scss']
})
export class BasicModelDetailsViewComponent implements OnInit {

  // Angular variables
  @Output() editForm = new EventEmitter();
  @Input() modelData: AssessmentModelDataModel;
  @Input() isLoadingModelDetails: boolean;
  @Input() isModelReference: boolean;

  // State variables
  constructor() { }

  ngOnInit() { }

  onEditModelDetails = () => {
    this.editForm.emit();
  }
}
