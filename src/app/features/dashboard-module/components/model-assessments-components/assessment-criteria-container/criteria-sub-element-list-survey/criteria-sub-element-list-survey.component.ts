import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AssessmentService } from '@app/core';

@Component({
  selector: 'app-criteria-sub-element-list-survey',
  templateUrl: './criteria-sub-element-list-survey.component.html',
  styleUrls: ['./criteria-sub-element-list-survey.component.scss']
})
export class CriteriaSubElementListSurveyComponent implements OnInit, OnChanges {

  @Input() subElementList = [];
  currentIndex: number;
  @Input() selectedSurveyElement;
  @Input() assessmentSurveyDetail;
  @Input() isLoadingResults: boolean;
  @Output() subElementSelect = new EventEmitter<any>();

  ngOnInit() {
  }

  constructor(
    private _assessmentService: AssessmentService,
  ) {
    this.currentIndex = this._assessmentService.getSubElementIndex();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.selectedSurveyElement) {
      const change = changes.selectedSurveyElement;
      if (change.currentValue) {
        this.currentIndex = this._assessmentService.getSubElementIndex() || 0;
      }
    }
  }

  onClickSubElement = (subElement, index) => {
    this._assessmentService.setLevel(1);
    this.currentIndex = index;
    this._assessmentService.setSubElementIndex(index);
    this.subElementSelect.emit({ subElement });
  }
}

