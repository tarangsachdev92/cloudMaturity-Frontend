// tslint:disable: import-spacing

import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "@app/core";
import {
  AssessmentRouteConstants,
  ConfirmationDialogComponent,
  DocumentViewTypeEnum,
  getDocType,
  ProcedureViewEnum,
  questionTypes,
} from "@app/utility";
import { Observable, Subscription } from "rxjs";
import { AddAssessmentProcedureDocumentDialogComponent } from "../add-assessment-procedure-document-dialog/add-assessment-procedure-document-dialog.component";
import { AddAssessmentProcedureRequirementsDialogComponent } from "../add-assessment-procedure-requirements-dialog/add-assessment-procedure-requirements-dialog.component";
import { AddImplementationProcedureDialogComponent } from "../add-implementation-procedure-dialog/add-implementation-procedure-dialog.component";
import { CriteriaAttachmentDetailsDialogComponent } from "../criteria-attachment-details-dialog/criteria-attachment-details-dialog.component";
import { CriteriaDescriptionDialogComponent } from "../../criteria-description-dialog/criteria-description-dialog.component";
import { CriteriaDetailsAttachmentListDialogComponent } from "../criteria-details-attachment-list-dialog/criteria-details-attachment-list-dialog.component";
import { DocumentPreviewDialogComponent } from "../document-preview-dialog/document-preview-dialog.component";
import { QuestionDetailsDialogComponent } from "../question-details-dialog/question-details-dialog.component";
import { AssessmentModelService } from "@app/features/dashboard-module/services";
import { BreadcrumbService } from "@app/core/services/breadcrumb.service";

@Component({
  selector: "app-assessment-model-criteria-container-details",
  templateUrl: "./assessment-model-criteria-details.component.html",
  styleUrls: ["./assessment-model-criteria-details.component.scss"],
})
export class AssessmentModelCriteriaDetailsComponent
  implements OnInit, OnDestroy {
  // Angular variables
  procedureViewEnum = ProcedureViewEnum;
  isShowView = this.procedureViewEnum.ASSESSMENT_PROCEDURE;
  criteriaId;
  criteriaDetail;

  criteriaDialogRef;
  requirementDialogRef;
  questionDialogRef;
  documentDialogRef;
  taskDialogRef;
  taskDocumentListDialogRef;
  attachmentDialogRef;
  documentPreviewDialogRef;
  isModelReference = true;
  // Data variables
  tabAddBtnText = "Add Requirement";

  assessmentProcedureSelectedIndex = 0;
  private sub: any;

  private listRequirementSubscription$: Subscription;
  private deleteRequirementSubscription$: Subscription;
  private listQuestionSubscription$: Subscription;
  private deleteQuestionSubscription$: Subscription;
  private listDocumentSubscription$: Subscription;
  private deleteDocumentSubscription$: Subscription;
  private listTaskSubscription$: Subscription;
  private deleteTaskSubscription$: Subscription;
  private listAttachmentSubscription$: Subscription;
  private deleteAttachmentSubscription$: Subscription;

  isLoadingCriteria = false;
  isLoadingRequirement = false;
  isLoadingQuestion = false;
  isLoadingDocument = false;
  isLoadingTask = false;
  isLoadingAttachment = false;

  requirementList = [];
  questionList = [];
  documentList = [];
  taskList = [];
  attachmentList = [];

  constructor(
    public location: Location,
    private router: Router,
    private commonService: CommonService,
    private assessmentModelService: AssessmentModelService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.isModelReference = this.activatedRoute.snapshot.data.isModelReference;
    this.routeSubscribe();
  }

  routeSubscribe = () => {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.criteriaId = params.criteriaId;
      if (this.criteriaId) {
        this.bindPageData(this.criteriaId);
      } else {
        this.location.back();
      }
    });
  };

  bindPageData = (criteriaId: string) => {
    this.bindCriteriaDetail(criteriaId);
    this.bindRequirements(criteriaId);
    this.bindQuestions(criteriaId);
    this.bindDocuments(criteriaId);
    this.bindTasks(criteriaId);
    this.bindAttachments(criteriaId);
  };

  bindCriteriaDetail = (criteriaId) => {
    this.isLoadingCriteria = true;
    this.getAssessmentModelCriteria(criteriaId).subscribe(
      (response) => {
        this.criteriaDetail = response.payload.criteria;
        this.isLoadingCriteria = false;
      },
      (error) => {
        this.isLoadingCriteria = false;
      }
    );
  };

  bindRequirements = (criteriaId) => {
    if (this.listRequirementSubscription$) {
      this.listRequirementSubscription$.unsubscribe();
    }
    this.isLoadingRequirement = true;
    this.listRequirementSubscription$ = this.getAssessmentModelCriteriaRequirements(
      criteriaId
    ).subscribe(
      (response) => {
        this.requirementList = response.payload.requirements;
        this.isLoadingRequirement = false;
      },
      (error) => {
        this.isLoadingRequirement = false;
      }
    );
  };

  bindQuestions = (criteriaId) => {
    if (this.listQuestionSubscription$) {
      this.listQuestionSubscription$.unsubscribe();
    }
    this.isLoadingQuestion = true;
    this.listQuestionSubscription$ = this.getAssessmentModelCriteriaQuestions(
      criteriaId
    ).subscribe(
      (response) => {
        this.questionList = response.payload.questions;
        this.isLoadingQuestion = false;
      },
      (error) => {
        this.isLoadingQuestion = false;
      }
    );
  };

  bindDocuments = (criteriaId) => {
    if (this.listDocumentSubscription$) {
      this.listDocumentSubscription$.unsubscribe();
    }
    this.isLoadingDocument = true;
    this.listDocumentSubscription$ = this.getAssessmentModelCriteriaDocuments(
      criteriaId
    ).subscribe(
      (response) => {
        this.documentList = response.payload.documents;
        this.isLoadingDocument = false;
      },
      (error) => {
        this.isLoadingDocument = false;
      }
    );
  };

  bindTasks = (criteriaId) => {
    if (this.listTaskSubscription$) {
      this.listTaskSubscription$.unsubscribe();
    }
    this.isLoadingTask = true;
    this.listTaskSubscription$ = this.getAssessmentModelCriteriaTasks(
      criteriaId
    ).subscribe(
      (response) => {
        this.taskList = response.payload.tasks;
        this.isLoadingTask = false;
      },
      (error) => {
        this.isLoadingTask = false;
      }
    );
  };

  bindAttachments = (criteriaId) => {
    if (this.listAttachmentSubscription$) {
      this.listAttachmentSubscription$.unsubscribe();
    }
    this.isLoadingAttachment = true;
    this.listAttachmentSubscription$ = this.getAssessmentModelCriteriaAttachments(
      criteriaId
    ).subscribe(
      (response) => {
        this.attachmentList = response.payload.attachments;
        this.isLoadingAttachment = false;
      },
      (error) => {
        this.isLoadingAttachment = false;
      }
    );
  };

  getAssessmentModelCriteria = (criteriaId) => {
    return this.assessmentModelService.getAssessmentModelCriteria(criteriaId);
  };

  getAssessmentModelCriteriaRequirements = (criteriaId) => {
    return this.assessmentModelService.getAssessmentModelCriteriaRequirements(
      criteriaId
    );
  };

  getAssessmentModelCriteriaQuestions = (criteriaId) => {
    return this.assessmentModelService.getAssessmentModelCriteriaQuestions(
      criteriaId
    );
  };

  getAssessmentModelCriteriaDocuments = (criteriaId) => {
    return this.assessmentModelService.getAssessmentModelCriteriaDocuments(
      criteriaId
    );
  };

  getAssessmentModelCriteriaTasks = (criteriaId) => {
    return this.assessmentModelService.getAssessmentModelCriteriaTasks(
      criteriaId
    );
  };

  getAssessmentModelCriteriaAttachments = (criteriaId) => {
    return this.assessmentModelService.getAssessmentModelCriteriaAttachments(
      criteriaId
    );
  };

  redirectToAssessmentModel = (modelId) => {
    if (modelId) {
      this.router.navigate([
        "/" + AssessmentRouteConstants.EDIT_ASSESSMENT_MODEL,
        modelId,
      ]);
    }
  };

  onAddAttachment = () => {
    this.attachmentDialogRef = this.dialog.open(
      CriteriaAttachmentDetailsDialogComponent,
      {
        width: "550px",
      }
    );

    this.attachmentDialogRef.componentInstance.criteria = this.criteriaDetail;

    const sub = this.attachmentDialogRef.componentInstance.attachmentUpload.subscribe(
      (event) => {
        if (event) {
          const { attachmentArray } = event;
          const fileArray = [{ reqKey: "attachments", files: attachmentArray }];
          this.saveAttachment(this.criteriaDetail._id, fileArray);
        }
      }
    );

    this.attachmentDialogRef.afterClosed().subscribe((response) => {
      if (response && response.submit) {
        const attachment = response.attachment;
        if (attachment.length) {
          this.attachmentList = [...this.attachmentList, ...attachment];
        }
      }
      sub.unsubscribe();
    });
  };

  onChangeView = (view: ProcedureViewEnum) => {
    this.isShowView = view;
  };

  onDeleteAttachment = (event, attachment) => {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: "Are you sure want to delete this attachment?",
        title: "Delete Attachment",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        if (this.deleteAttachmentSubscription$) {
          this.deleteAttachmentSubscription$.unsubscribe();
        }
        const params = {
          attachments: [attachment._id],
        };

        this.deleteAttachmentSubscription$ = this.deleteCriteriaAttachment(
          this.criteriaDetail._id,
          params
        ).subscribe((response) => {
          const index = this.attachmentList.findIndex(
            (elem) => elem._id === attachment._id
          );
          this.attachmentList.splice(index, 1);
        });
      }
    });
  };

  onTabChange = (event) => {
    this.assessmentProcedureSelectedIndex = event.index;
    if (event.index === 0) {
      this.tabAddBtnText = "Add Requirement";
    } else if (event.index === 1) {
      this.tabAddBtnText = "Add Question";
    } else if (event.index === 2) {
      this.tabAddBtnText = "Add document";
    }
  };

  onClickAdd = () => {
    if (this.assessmentProcedureSelectedIndex === 0) {
      this.onShowAddRequirementDialog();
    }
    if (this.assessmentProcedureSelectedIndex === 1) {
      this.onShowAddQuestionDialog();
    }
    if (this.assessmentProcedureSelectedIndex === 2) {
      this.onAddShowCriteriaDocumentDialog();
    }
  };

  onEditRequirement = (event, requirement) => {
    this.onShowAddRequirementDialog(requirement);
  };

  onDeleteRequirement = (event, requirement) => {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: "Are you sure want to delete this requirement?",
        title: "Delete Requirement",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        if (this.deleteRequirementSubscription$) {
          this.deleteRequirementSubscription$.unsubscribe();
        }
        const params = {
          requirements: [requirement._id],
        };

        this.deleteRequirementSubscription$ = this.deleteSelectedCriteriaRequirements(
          this.criteriaDetail._id,
          params
        ).subscribe((response) => {
          const index = this.requirementList.findIndex(
            (elem) => elem._id === requirement._id
          );
          this.requirementList.splice(index, 1);
        });
      }
    });
  };

  onShowAddRequirementDialog = (requirementData = null) => {
    this.requirementDialogRef = this.dialog.open(
      AddAssessmentProcedureRequirementsDialogComponent,
      {
        width: "550px",
      }
    );

    this.requirementDialogRef.componentInstance.requirement = requirementData;

    const sub = this.requirementDialogRef.componentInstance.requirementAddUpdate.subscribe(
      (event) => {
        if (event) {
          const { params } = event;
          this.saveRequirement(
            this.criteriaDetail._id,
            params,
            requirementData
          );
        }
      }
    );
    this.requirementDialogRef.afterClosed().subscribe((response) => {
      if (response && response.submit) {
        const requirement = response.requirement;
        if (requirement) {
          if (requirementData) {
            const index = this.requirementList.findIndex(
              (elem) => elem._id === requirement._id
            );
            if (index > -1) {
              this.requirementList[index] = requirement;
            }
          } else {
            this.requirementList.push(response.requirement);
          }
        }
      }
      sub.unsubscribe();
    });
  };

  onEditQuestion = (event, question) => {
    this.onShowAddQuestionDialog(question);
  };

  onDeleteQuestion = (event, question) => {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: "Are you sure want to delete this question?",
        title: "Delete Question",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        if (this.deleteQuestionSubscription$) {
          this.deleteQuestionSubscription$.unsubscribe();
        }
        const params = {
          questions: [question._id],
        };

        this.deleteQuestionSubscription$ = this.deleteSelectedCriteriaQuestions(
          this.criteriaDetail._id,
          params
        ).subscribe((response) => {
          const index = this.requirementList.findIndex(
            (elem) => elem._id === question._id
          );
          this.questionList.splice(index, 1);
        });
      }
    });
  };

  onShowAddQuestionDialog = (questionData = null) => {
    this.questionDialogRef = this.dialog.open(QuestionDetailsDialogComponent, {
      width: "550px",
    });

    this.questionDialogRef.componentInstance.question = questionData;

    const sub = this.questionDialogRef.componentInstance.questionAddUpdate.subscribe(
      (event) => {
        if (event) {
          const { params } = event;
          this.saveQuestion(this.criteriaDetail._id, params, questionData);
        }
      }
    );
    this.questionDialogRef.afterClosed().subscribe((response) => {
      if (response && response.submit) {
        const question = response.question;
        if (question) {
          if (questionData) {
            const index = this.questionList.findIndex(
              (elem) => elem._id === question._id
            );
            if (index > -1) {
              this.questionList[index] = question;
            }
          } else {
            this.questionList.push(response.question);
          }
        }
      }
      sub.unsubscribe();
    });
  };

  onEditDocument = (event, document) => {
    this.onAddShowCriteriaDocumentDialog(document);
  };

  onDeleteDocument = (event, document) => {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: "Are you sure want to delete this document?",
        title: "Delete Document",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        if (this.deleteDocumentSubscription$) {
          this.deleteDocumentSubscription$.unsubscribe();
        }
        const params = {
          documents: [document._id],
        };

        this.deleteDocumentSubscription$ = this.deleteSelectedCriteriaDocuments(
          this.criteriaDetail._id,
          params
        ).subscribe((response) => {
          const index = this.documentList.findIndex(
            (elem) => elem._id === document._id
          );
          this.documentList.splice(index, 1);
        });
      }
    });
  };

  onAddShowCriteriaDocumentDialog = (documentData = null) => {
    this.documentDialogRef = this.dialog.open(
      AddAssessmentProcedureDocumentDialogComponent,
      {
        width: "550px",
      }
    );

    this.documentDialogRef.componentInstance.document = documentData;

    const sub = this.documentDialogRef.componentInstance.documentAddUpdate.subscribe(
      (event) => {
        if (event) {
          const { params } = event;
          this.saveDocument(this.criteriaDetail._id, params, documentData);
        }
      }
    );
    this.documentDialogRef.afterClosed().subscribe((response) => {
      if (response && response.submit) {
        const document = response.document;
        if (document) {
          if (documentData) {
            const index = this.documentList.findIndex(
              (elem) => elem._id === document._id
            );
            if (index > -1) {
              this.documentList[index] = document;
            }
          } else {
            this.documentList.push(response.document);
          }
        }
      }
      sub.unsubscribe();
    });
  };

  onEditTask = (event, task) => {
    this.onAddTask(task);
  };

  onDeleteTask = (event, task) => {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "500px",
      data: {
        message: "Are you sure want to delete this task?",
        title: "Delete Task",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        if (this.deleteTaskSubscription$) {
          this.deleteTaskSubscription$.unsubscribe();
        }
        const params = {
          tasks: [task._id],
        };

        this.deleteTaskSubscription$ = this.deleteSelectedCriteriaTasks(
          this.criteriaDetail._id,
          params
        ).subscribe((response) => {
          const index = this.taskList.findIndex(
            (elem) => elem._id === task._id
          );
          this.taskList.splice(index, 1);
        });
      }
    });
  };

  onShowAllDocuments = (task) => {
    this.taskDocumentListDialogRef = this.dialog.open(
      CriteriaDetailsAttachmentListDialogComponent,
      {
        width: "550px",
      }
    );

    this.taskDocumentListDialogRef.componentInstance.documents = task.documents;
    this.taskDocumentListDialogRef.afterClosed().subscribe((result) => { });
  };

  onDocumentPreview = (attachment) => {
    this.getFileUrl(attachment).subscribe(
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
  };

  onEditCriteria = (criteria) => {
    if (criteria) {
      this.criteriaDialogRef = this.dialog.open(
        CriteriaDescriptionDialogComponent,
        {
          width: "950px",
        }
      );

      this.criteriaDialogRef.componentInstance.currentLevel = criteria.level;
      this.criteriaDialogRef.componentInstance.criteria = criteria;

      const sub = this.criteriaDialogRef.componentInstance.criteriaAddUpdate.subscribe(
        (event) => {
          if (event) {
            const { params } = event;
            if (params) {
              let newParams = { ...params };
              if (criteria) {
                newParams = params.criterias[0];
                newParams.criteria_id = criteria._id;
              }
              this.saveCriteria(newParams);
            }
          }
        }
      );
      this.criteriaDialogRef.afterClosed().subscribe((response) => {
        if (response && response.submit) {
          this.criteriaDetail = {
            ...this.criteriaDetail,
            ...response.criteria,
          };
        }

        // update breadcrumb
        // this is to update breadcrumb value so that user can see updated name
        // here 3 is static based on the current route so when you change anything in route we need to change here
        const currentBreadCrumbs = this.breadcrumbService.getCurrentBreadCrumbs();
        currentBreadCrumbs[3].displayData.title = this.criteriaDetail.criteria_unique_id
        this.breadcrumbService.breadcrumbChanged.emit(currentBreadCrumbs)
        sub.unsubscribe();
      });
    }
  };

  saveCriteria = (params) => {
    this.assessmentModelService.saveCriteria(params).subscribe(
      (response) => {
        if (this.criteriaDialogRef) {
          this.criteriaDialogRef.close({
            submit: true,
            criteria: response.payload.criteria,
          });
        }
      },
      (error) => { }
    );
  };

  saveRequirement = (criteriaId, params, requirement) => {
    this.assessmentModelService
      .saveRequirement(criteriaId, params, requirement ? requirement._id : "")
      .subscribe(
        (response) => {
          if (this.requirementDialogRef) {
            this.requirementDialogRef.close({
              submit: true,
              requirement: response.payload.requirement,
            });
          }
        },
        (error) => { }
      );
  };

  saveAttachment = (criteriaId, fileArray) => {
    this.assessmentModelService.saveAttachment(criteriaId, fileArray).subscribe(
      (response) => {
        if (this.attachmentDialogRef) {
          this.attachmentDialogRef.close({
            submit: true,
            attachment: response.payload.attachments,
          });
        }
      },
      (error) => { }
    );
  };

  saveQuestion = (criteriaId, params, question) => {
    this.assessmentModelService
      .saveQuestion(criteriaId, params, question ? question._id : "")
      .subscribe(
        (response) => {
          if (this.questionDialogRef) {
            this.questionDialogRef.close({
              submit: true,
              question: response.payload.question,
            });
          }
        },
        (error) => { }
      );
  };

  saveDocument = (criteriaId, params, document) => {
    this.assessmentModelService
      .saveDocument(criteriaId, params, document ? document._id : "")
      .subscribe(
        (response) => {
          if (this.documentDialogRef) {
            this.documentDialogRef.close({
              submit: true,
              document: response.payload.document,
            });
          }
        },
        (error) => { }
      );
  };

  saveTask = (criteriaId, params, documentArray, task) => {
    const fileArray = [{ reqKey: "documents", files: documentArray }];
    this.assessmentModelService
      .saveTask(criteriaId, task ? task._id : "", params, fileArray)
      .subscribe(
        (response) => {
          if (this.taskDialogRef) {
            this.taskDialogRef.close({
              submit: true,
              task: response.payload.task,
            });
          }
        },
        (error) => { }
      );
  };

  deleteSelectedCriteriaRequirements = (
    criteriaId,
    params
  ): Observable<any> => {
    return this.assessmentModelService.deleteRequirement(criteriaId, params);
  };

  deleteSelectedCriteriaQuestions = (criteriaId, params): Observable<any> => {
    return this.assessmentModelService.deleteQuestion(criteriaId, params);
  };

  deleteSelectedCriteriaDocuments = (criteriaId, params): Observable<any> => {
    return this.assessmentModelService.deleteDocument(criteriaId, params);
  };

  deleteSelectedCriteriaTasks = (criteriaId, params): Observable<any> => {
    return this.assessmentModelService.deleteTask(criteriaId, params);
  };

  deleteCriteriaAttachment = (criteriaId, params): Observable<any> => {
    return this.assessmentModelService.deleteCriteriaAttachment2(
      criteriaId,
      params
    );
  };

  onAddTask = (taskData = null) => {
    this.taskDialogRef = this.dialog.open(
      AddImplementationProcedureDialogComponent,
      {
        width: "550px",
      }
    );

    this.taskDialogRef.componentInstance.task = taskData;

    const sub = this.taskDialogRef.componentInstance.taskAddUpdate.subscribe(
      (event) => {
        if (event) {
          const { params, documentArray } = event;
          this.saveTask(
            this.criteriaDetail._id,
            params,
            documentArray,
            taskData
          );
        }
      }
    );
    this.taskDialogRef.afterClosed().subscribe((response) => {
      if (response && response.submit) {
        const task = response.task;
        if (task) {
          if (taskData) {
            const index = this.taskList.findIndex(
              (elem) => elem._id === task._id
            );
            if (index > -1) {
              this.taskList[index] = task;
            }
          } else {
            this.taskList.push(response.task);
          }
        }
      }
      sub.unsubscribe();
    });
  };

  questionTypeLabel(question) {
    const currentQuestionType = questionTypes.filter(
      (elem) => elem.value === question.type
    )[0];
    return (currentQuestionType && currentQuestionType.display) || "";
  }

  getFileUrl = (attachment): Observable<any> => {
    const { company_id, path } = attachment;
    const filePath = `${company_id}/${path}`;
    return this.commonService.getFileUrl(filePath);
  };

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.listRequirementSubscription$) {
      this.listRequirementSubscription$.unsubscribe();
    }
    if (this.deleteRequirementSubscription$) {
      this.deleteRequirementSubscription$.unsubscribe();
    }
    if (this.listQuestionSubscription$) {
      this.listQuestionSubscription$.unsubscribe();
    }
    if (this.deleteQuestionSubscription$) {
      this.deleteQuestionSubscription$.unsubscribe();
    }
    if (this.listDocumentSubscription$) {
      this.listDocumentSubscription$.unsubscribe();
    }
    if (this.deleteDocumentSubscription$) {
      this.deleteDocumentSubscription$.unsubscribe();
    }
    if (this.listTaskSubscription$) {
      this.listTaskSubscription$.unsubscribe();
    }
    if (this.deleteTaskSubscription$) {
      this.deleteTaskSubscription$.unsubscribe();
    }
    if (this.listAttachmentSubscription$) {
      this.listAttachmentSubscription$.unsubscribe();
    }
    if (this.deleteAttachmentSubscription$) {
      this.deleteAttachmentSubscription$.unsubscribe();
    }
  }
}
