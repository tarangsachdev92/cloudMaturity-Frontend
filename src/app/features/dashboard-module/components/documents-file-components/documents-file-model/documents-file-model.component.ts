import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { CommonService } from "@app/core";
import { ModelDocumentService } from "@app/features/dashboard-module/services";
import { documentStatus, uploadTypes, PagerModel, PAGE_SIZE_OPTIONS, prepareOrganisationTreeData, FormBaseComponent, UploadTypesEnum, imgExtensions, DocumentViewTypeEnum, getDocType } from "@app/utility";
import { Observable, Subscription, throwError } from "rxjs";
import { catchError, debounceTime, startWith, switchMap } from "rxjs/operators";
import { DocumentPreviewDialogComponent } from "../../model-details-components";
import { DocumentsFileDetailsDialogComponent } from "../documents-file-details-dialog/documents-file-details-dialog.component";
import { GenerateDocumentsDialogComponent } from '../generate-documents-dialog/generate-documents-dialog.component';

@Component({
  selector: "app-documents-file-model",
  templateUrl: "./documents-file-model.component.html",
  styleUrls: ["./documents-file-model.component.scss"],
})
export class DocumentsFileModelComponent extends FormBaseComponent implements OnInit, OnDestroy {
  // Form Control Variables
  organisations = [];
  organisationDocumentDialogRef;
  editFileDialogRef;
  selectedOrganisation;
  documentData;
  organisationDocuments = [];
  isLoadingOrganisationDocument = false;
  modelDocumentStatusList = documentStatus;
  uploadTypeList = uploadTypes;
  documentPreviewDialogRef;
  filterDocumentForm: FormGroup;
  // Pagination related variables
  pageSizeOptions = PAGE_SIZE_OPTIONS;
  pager: PagerModel = {
    page: 1,
    recordsPerPage: this.pageSizeOptions[0],
    totalRecords: 0,
    filteredRecords: 0,
  };

  // State Variables
  isShowFilter = false;
  isShowAttachmentDetails = false;

  nodes = [];
  org_id;
  modelId;
  private sub$: Subscription;
  documentTypeList;

  private listDocumentSubscription$: Subscription;

  constructor(
    _fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private modelDocumentService: ModelDocumentService,
    public dialog: MatDialog, private commonService: CommonService,
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.modelId = this.activatedRoute.snapshot.params.modelId;
    this.createDocumentFilterForm();
    this.bindOrganisations();
    this.bindDocumentTypeList();
    this.routeSubscribe();
  }

  bindDocumentTypeList = () => {
    this.documentTypeList = [];
    this.getDocumentTypeList().subscribe(response => {
      this.handleDocumentTypeListResponse(response)
    }, error => {
    })
  }

  handleDocumentTypeListResponse = (response) => {
    this.documentTypeList = response.payload.documentTypes;
  }

  getDocumentTypeList = (): Observable<any> => {
    return this.commonService.getDocumentTypeList({})
  }

  createDocumentFilterForm = () => {
    this.filterDocumentForm = this.createForm({
      name: ['', []],
      title: ['', []],
      type: ['', []],
      level: ['', []],
      element: ['', []],
      required: ['', []],
      status: ['', []],
      link_or_name: ['', []],
    });
  };

  initSearch = (isResetPagination = true) => {
    if (this.listDocumentSubscription$) this.listDocumentSubscription$.unsubscribe();
    this.listDocumentSubscription$ = this.filterDocumentForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap(() => {
          if (isResetPagination) this.pager.page = 1;
          this.organisationDocuments = [];
          this.isLoadingOrganisationDocument = true;
          this.isShowAttachmentDetails = true;
          return this.getOrganisationModelDocument().pipe(
            catchError((error) => {
              return throwError(error);
            })
          );
        })
      )
      .subscribe((data) => this.handleDocumentResponse(data), error => {
        this.isLoadingOrganisationDocument = false;
      });
  };

  handleDocumentResponse = (response) => {
    this.isLoadingOrganisationDocument = false;
    this.organisationDocuments = response.payload.data;
    this.pager = response.payload.pager;
  };

  getOrganisationModelDocument = (): Observable<any> => {
    return this.modelDocumentService.getOrganisationModelDocument(this.selectedOrganisation._id, this.apiParams, false);
  };

  routeSubscribe = () => {
    this.sub$ = this.activatedRoute.params.subscribe((params) => {
      this.modelId = params.modelId;
    });
  };

  bindOrganisations = () => {
    this.getOrganisations().subscribe((response) => {
      this.organisations = response.payload.data || []
      this.nodes = prepareOrganisationTreeData(this.organisations, true);
    });
  }

  getOrganisations = (): Observable<any> => {
    // TODO remove page:1 as a required field from the api
    const params = { page: 1, recordsPerPage: 999999 };
    return this.commonService.getOrganisationListWithParentChildRelation(params);
  }

  generateDocumentForOrganisation = (modelId, orgId) => {
    const params = { org_id: orgId };
    this.importOrRefreshOrganisationModelDocuments(modelId, params).subscribe(res => {
      this.checkOrganisationHaveDocuments(this.modelId, orgId)
        .subscribe(res => {
          const data = res.payload || {};
          this.documentData = data;
          this.initSearch();
        }, e => { });
    }, error => { })
  }

  onOpenOrganisationSelectDialog = (organisation) => {
    this.organisationDocumentDialogRef = this.dialog.open(GenerateDocumentsDialogComponent,
      { width: "500px" }
    );
    this.organisationDocumentDialogRef.componentInstance.organisation = organisation;

    const sub = this.organisationDocumentDialogRef.componentInstance.createDocument.subscribe(
      (event) => {
        if (this.organisationDocumentDialogRef) {
          this.organisationDocumentDialogRef.close({ created: false });
        }
        if (event) {
          this.generateDocumentForOrganisation(this.modelId, organisation._id)
        } else { }
      }
    );

    this.organisationDocumentDialogRef.afterClosed().subscribe((response) => {
      if (response && response.submit) { }
      sub.unsubscribe();
    });

  }

  validateOrganisationAndBindData = (modelId, orgId, isUpdate = false) => {
    this.checkOrganisationHaveDocuments(modelId, orgId)
      .subscribe(res => {
        const data = res.payload || {};
        const { total } = data;
        this.documentData = data;
        if (!total || total === 0) {
          this.documentData = {};
          this.isShowAttachmentDetails = false;
          this.organisationDocuments = [];
          this.onOpenOrganisationSelectDialog(this.selectedOrganisation);
        } else {
          if (!isUpdate) {
            this.initSearch();
          }
        }
      }, e => { });
  }

  onOrganisationChange = (event) => {
    this.selectedOrganisation = event;
    if (this.selectedOrganisation && this.selectedOrganisation._id) {
      this.validateOrganisationAndBindData(this.modelId, this.selectedOrganisation._id)
    } else {
      // handle else case;
      this.selectedOrganisation = null;
      this.organisationDocuments = [];
      this.documentData = null;
      this.isShowAttachmentDetails = false;
    }
  }

  getDocumentElements = (document) => {
    const elements = document.elements || [];
    return elements.filter((_, i) => i <= 2)
  }

  getMoreDocumentElements = (document) => {
    const elements = document.elements || [];
    return elements.filter((_, i) => i > 2)
  }

  get apiParams() {
    const { page, recordsPerPage } = this.pager;
    const { name, title, type, level, element, status, required, link_or_name } = this.filterDocumentForm.value;
    const params: any = { page, recordsPerPage, model_id: this.modelId };
    if (name) {
      params.name = name;
    }
    if (title) {
      params.title = title;
    }
    if (type) {
      params.type = type;
    }
    if (level && !isNaN(+level)) {
      params.level = +level;
    }
    if (required || required === false) {
      params.required = required;
    }
    if (element) {
      params.element = element;
    }
    if (link_or_name) {
      params.link_or_name = link_or_name;
    }
    if (status) {
      params.status = status;
    }
    return params;
  }

  onFilterToggle = () => {
    this.isShowFilter = !this.isShowFilter;
  };

  onClearFilter = (isRefresh = false) => {
    if (isRefresh) {
      this.filterDocumentForm.reset({}, { emitEvent: false })
      this.generateDocumentForOrganisation(this.modelId, this.selectedOrganisation._id)
    } else {
      this.filterDocumentForm.reset()
    }
  };

  updateDocument = (orgId, documentId, params, fileArray) => {
    this.updateOrganisationDocumentRequirement(orgId, documentId, params, fileArray).subscribe(res => {
      if (this.editFileDialogRef) {
        this.editFileDialogRef.close();
      }
      const orgDocIndex = this.organisationDocuments.findIndex(e => e._id === documentId);
      if (orgDocIndex > -1) {
        this.organisationDocuments[orgDocIndex] = res.payload.orgDocument;
      }
      this.validateOrganisationAndBindData(this.modelId, this.selectedOrganisation._id, true)
    }, error => { })
  }

  onDocumentRequirementDialog = (orgDoc) => {
    this.editFileDialogRef = this.dialog.open(DocumentsFileDetailsDialogComponent,
      { width: "500px" }
    );

    this.editFileDialogRef.componentInstance.document = orgDoc;

    const sub = this.editFileDialogRef.componentInstance.updateDocument.subscribe(
      (event) => {
        const { params, attachment } = event;
        let fileArray = [];
        if (attachment) {
          fileArray = [{ reqKey: 'attachments', files: [attachment] }];
        }
        this.updateDocument(this.selectedOrganisation._id, orgDoc._id, params, fileArray);
      }
    );

    this.editFileDialogRef.afterClosed().subscribe((response) => {
      sub.unsubscribe();
    });
  };

  onEditDocument = (orgDoc) => {
    this.onDocumentRequirementDialog(orgDoc);
  }

  checkOrganisationHaveDocuments = (modelId, organisationId): Observable<any> => {
    return this.modelDocumentService.getModelDocumentStaticsByOrganisation(modelId, organisationId);
  }

  importOrRefreshOrganisationModelDocuments = (modelId, params): Observable<any> => {
    return this.modelDocumentService.importOrRefreshOrganisationModelDocuments(modelId, params);
  }

  updateOrganisationDocumentRequirement = (orgId, documentId, params, fileArray): Observable<any> => {
    return this.modelDocumentService.updateOrganisationDocumentRequirement(orgId, documentId, params, fileArray);
  }

  getFileUrl = (document): Observable<any> => {
    const { document_id, link } = document;
    const filePath = `${document_id.company_id}/${link}`;
    return this.commonService.getFileUrl(filePath);
  };

  onDocumentPreview = (orgDoc) => {
    if (orgDoc.type === UploadTypesEnum.LINK) {
      orgDoc.link && window.open(orgDoc.link, "_blank");
    } else if (orgDoc.type === UploadTypesEnum.ATTACHMENT) {
      this.getFileUrl(orgDoc).subscribe(
        (response) => {
          const url = response.payload.url;
          const docType: DocumentViewTypeEnum = getDocType(url);

          this.documentPreviewDialogRef = this.dialog.open(
            DocumentPreviewDialogComponent,
            {
              panelClass: "document-preview-dialog",
            }
          );
          this.documentPreviewDialogRef.componentInstance.url = url;
          this.documentPreviewDialogRef.componentInstance.docType = docType;
          this.documentPreviewDialogRef.afterClosed().subscribe((result) => { });
        },
        (error) => { }
      );
    }
  }

  pageChange = (page: any) => {
    this.pager.page = page.pageIndex + 1;
    this.pager.recordsPerPage = page.pageSize;
    this.initSearch(false);
  };

  getDocumentStatus = (status) => {
    const documentStatus = this.modelDocumentStatusList.find(s => s.value === status)
    return documentStatus && documentStatus.display;
  }

  isLink = (type) => {
    return type === 1
  }

  isAttachment = (type) => {
    return type === 2
  }

  get isFilterApplied() {
    const { name, title, type, level, element, status, required, link_or_name } = this.filterDocumentForm.value;
    return name || title || type || level || element || status || required || required === false || link_or_name
  }

  onRefreshClick = () => {
    this.onClearFilter(true);
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe()
    }
    if (this.listDocumentSubscription$) {
      this.listDocumentSubscription$.unsubscribe()
    }
  }
}
