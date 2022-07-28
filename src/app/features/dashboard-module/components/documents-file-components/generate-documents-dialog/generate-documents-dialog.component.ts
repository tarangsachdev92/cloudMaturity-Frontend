import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generate-documents-dialog',
  templateUrl: './generate-documents-dialog.component.html',
  styleUrls: ['./generate-documents-dialog.component.scss']
})
export class GenerateDocumentsDialogComponent {

  @Input() organisation;
  @Output() createDocument = new EventEmitter<boolean>();

  constructor() { }

  onAction = (action) => {
    this.createDocument.emit(!!action)
  };
}
