import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-activate-model-rules-dialog",
  templateUrl: "./activate-model-rules-dialog.component.html",
  styleUrls: ["./activate-model-rules-dialog.component.scss"],
})
export class ActivateModelRulesDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ActivateModelRulesDialogComponent>
  ) { }

  ngOnInit() { }

  @Input() modelData;
  @Output() confirm = new EventEmitter<any>();

  onOkClick = () => {
    this.confirm.emit(true)
  }

  onCancelClick = () => {
    this.dialogRef.close(false);
  }
}
