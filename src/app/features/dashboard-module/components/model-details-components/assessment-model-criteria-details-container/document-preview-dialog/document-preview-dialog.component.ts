import { Component, Input, OnInit } from '@angular/core';
import { DocumentViewTypeEnum } from '@app/utility';

@Component({
  selector: 'app-document-preview-dialog',
  templateUrl: './document-preview-dialog.component.html',
  styleUrls: ['./document-preview-dialog.component.scss'],
})
export class DocumentPreviewDialogComponent implements OnInit {

  @Input() url: string;
  @Input() docType: DocumentViewTypeEnum = DocumentViewTypeEnum.DOC;
  documentViewTypeEnum = DocumentViewTypeEnum;

  constructor() { }

  ngOnInit() { }
}
