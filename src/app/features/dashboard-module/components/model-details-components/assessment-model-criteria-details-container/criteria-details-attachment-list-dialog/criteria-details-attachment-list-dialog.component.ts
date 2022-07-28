import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '@app/core';
import { DocumentViewTypeEnum, getDocType } from '@app/utility';
import { Observable } from 'rxjs';
import { DocumentPreviewDialogComponent } from '../document-preview-dialog/document-preview-dialog.component';

@Component({
  selector: 'app-criteria-details-attachment-list-dialog',
  templateUrl: './criteria-details-attachment-list-dialog.component.html',
  styleUrls: ['./criteria-details-attachment-list-dialog.component.scss'],
})
export class CriteriaDetailsAttachmentListDialogComponent implements OnInit {

  @Input() documents = [];
  documentPreviewDialogRef;

  constructor(
    public dialog: MatDialog,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<CriteriaDetailsAttachmentListDialogComponent>
  ) { }

  ngOnInit() { }

  onCloseDialog = () => {
    this.dialogRef.close();
  }

  getFileUrl = (attachment): Observable<any> => {
    const { company_id, path } = attachment;
    const filePath = `${company_id}/${path}`;
    return this.commonService.getFileUrl(filePath);
  }

  onDocumentPreview = (attachment) => {
    this.getFileUrl(attachment).subscribe(response => {
      const url = response.payload.url;
      const docType: DocumentViewTypeEnum = getDocType(url);;
      this.documentPreviewDialogRef = this.dialog.open(DocumentPreviewDialogComponent, {
        panelClass: 'document-preview-dialog',
      });
      this.documentPreviewDialogRef.componentInstance.url = url;
      this.documentPreviewDialogRef.componentInstance.docType = docType;
      this.documentPreviewDialogRef.afterClosed().subscribe((result) => { });
    }, error => { });
  }
}
