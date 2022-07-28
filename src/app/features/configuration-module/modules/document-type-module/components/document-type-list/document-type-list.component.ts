import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssessmentRouteConstants, ConfirmationDialogComponent, DocumentTypeModel, PagerModel, PAGE_SIZE_OPTIONS } from '@app/utility';
import { Observable } from 'rxjs';
import { DocumentTypeService } from '../../services';
@Component({
  selector: 'app-document-type-list',
  templateUrl: './document-type-list.component.html',
  styleUrls: ['./document-type-list.component.scss']
})
export class DocumentTypeListComponent implements OnInit {

  documentTypeList: DocumentTypeModel[] = [];
  sortKey = 'type';
  sortOrder = '-1';

  // State variables
  isLoadingResults = false;

  constructor(private _router: Router, private documentTypeService: DocumentTypeService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.bindDocumentTypeList();
  }

  bindDocumentTypeList = () => {
    this.documentTypeList = [];
    this.isLoadingResults = true;
    this.getDocumentTypeList().subscribe(response => {
      this.handleDocumentTypeListResponse(response)
    }, error => {
      this.isLoadingResults = false;
    })
  }

  handleDocumentTypeListResponse = (response) => {
    this.isLoadingResults = false;
    this.documentTypeList = response.payload.documentTypes;
  }

  getDocumentTypeList = (): Observable<any> => {
    return this.documentTypeService.getDocumentTypeList({})
  }

  onEditDocumentType = (documentType: DocumentTypeModel) => {
    this._router.navigate([`/${AssessmentRouteConstants.EDIT_DOCUMENT_TYPE}`, documentType._id]);
  }

  onAddDocumentType = () => {
    this._router.navigate([`/${AssessmentRouteConstants.ADD_DOCUMENT_TYPE}`]);
  }

  deleteDocumentType = (id): Observable<any> => {
    return this.documentTypeService.deleteDocumentType(id)
  }

  onDeleteConfirmation(documentType: DocumentTypeModel): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { message: 'Are you sure want to delete this document type?', title: 'Delete Document Type' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result['submit']) {
        this.deleteDocumentType(documentType._id).subscribe(_ => {
          const doctypeIndex = this.documentTypeList.findIndex(e => e._id === documentType._id)
          this.documentTypeList.splice(doctypeIndex, 1);
        })
      }
    });
  }

}
