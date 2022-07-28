import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Router } from "@angular/router";
import { actionStatuses, assessmentCriteriaStatus } from "@app/utility";

@Component({
  selector: "app-criteria-gap-details",
  templateUrl: "./criteria-gap-details.component.html",
  styleUrls: ["./criteria-gap-details.component.scss"],
})
export class CriteriaGapDetailsComponent implements OnInit {

  // Angular variables
  @Output() back = new EventEmitter<boolean>();
  @Output() updateStatus = new EventEmitter<any>();
  @Input() selectedGap;
  statusChoiceList = assessmentCriteriaStatus;
  actionStatusList = actionStatuses;

  constructor() { }

  ngOnInit() { }

  onBack = () => {
    this.back.emit(true);
  };

  getCriteriaStatus = (status) => {
    const currentStatus = this.statusChoiceList.find(e => e.value === +status);
    return currentStatus && currentStatus.display || '';
  }

  getActionStatus = (action) => {
    const status = this.actionStatusList.find(e => +e.value === +action.status);
    return status && status.display;
  }

  onChangeStatus = (event) => {
    this.updateStatus.emit({ status: event.checked })
  }
}
