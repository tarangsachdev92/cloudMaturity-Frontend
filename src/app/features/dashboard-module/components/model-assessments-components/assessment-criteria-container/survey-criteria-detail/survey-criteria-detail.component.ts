import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AssessmentService, CommonService } from '@app/core';
import {
  assessmentCriteriaStatus,
  ConfirmationDialogComponent,
  DocumentViewTypeEnum,
  FormBaseComponent,
  getDocType,
  imgExtensions,
  QuestionTypeEnum,
  questionTypes,
  UploadTypesEnum,
} from '@app/utility';
import { Observable } from 'rxjs';
import { DocumentPreviewDialogComponent } from '../../../model-details-components';
@Component({
  selector: 'app-survey-criteria-detail',
  templateUrl: './survey-criteria-detail.component.html',
  styleUrls: ['./survey-criteria-detail.component.scss'],
})
export class SurveyCriteriaDetailComponent
  extends FormBaseComponent
  implements OnInit, OnChanges {
  // Form Group variables
  implementationForm: FormGroup;

  @Input() criteria;
  @Output() surveyUpdateFormSubmit = new EventEmitter<any>();
  @Output() updateAssessmentCriteriaRequirement = new EventEmitter<any>();

  // State variables
  isCheckedChoice = '';
  isShowNoteButton = false;
  panelOpenState = false;
  statusChoiceList = assessmentCriteriaStatus;
  alreadyUploadedAssessmentAttachment = [];
  uploadedFiles = [];
  removeDocumentDialogRef;
  documentPreviewDialogRef;

  questionType = QuestionTypeEnum;
  constructor(
    _fb: FormBuilder,
    private commonService: CommonService,
    private assessmentService: AssessmentService,
    public dialog: MatDialog
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.initialize();
  }

  initialize = () => {
    this.createImplementationForm();
    this.isCheckedChoice = this.criteria.status;
    this.alreadyUploadedAssessmentAttachment =
      this.criteria.assessment_attachments || [];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.criteria) {
      const change = changes.criteria;
      if (change.currentValue) {
        this.isShowNoteButton = false;
        this.alreadyUploadedAssessmentAttachment =
          this.criteria.assessment_attachments || [];
      }
    }
  }

  createImplementationForm = () => {
    this.implementationForm = this.createForm({
      attachment: ['', []],
      status: [this.criteria.status || '', []],
      note: [this.criteria.note || '', []],
    });
  }

  onChoiceChange = (val) => {
    this.isCheckedChoice = val;
    const params = { status: this.implementationForm.value.status };
    this.surveyUpdateFormSubmit.emit({ params });
  }

  onSaveNote = () => {
    const params = { note: this.implementationForm.value.note };
    this.surveyUpdateFormSubmit.emit({ params });
  }

  onChangeRelevant = (event) => {
    const params = { relevant: event.checked };
    this.surveyUpdateFormSubmit.emit({ params });
  }

  onFileSelect = (id) => {
    document.getElementById(id).click();
  }

  onCancelNote = () => {
    this.isShowNoteButton = false;
  }

  onShowNote = () => {
    this.isShowNoteButton = true;
  }

  deleteAssessmentAttachment = (
    attachmentId,
    criteriaId,
    assessmentId
  ): Observable<any> => {
    return this.assessmentService.deleteAssessmentAttachment(
      attachmentId,
      criteriaId,
      assessmentId
    );
  }

  onRemoveAlreadyUploadedAssessmentAttachment = (
    attachment,
    criteria,
    attachmentIndex
  ) => {
    this.removeDocumentDialogRef = this.dialog.open(
      ConfirmationDialogComponent,
      {
        width: '500px',
        data: {
          message: 'Are you sure want to delete this attachment?',
          title: 'Delete Attachment',
        },
      }
    );

    this.removeDocumentDialogRef.afterClosed().subscribe((result) => {
      if (result && result.submit) {
        this.deleteAssessmentAttachment(
          attachment._id,
          criteria.criteria_id,
          criteria.assessment_id
        ).subscribe((response) => {
          this.alreadyUploadedAssessmentAttachment.splice(attachmentIndex, 1);
        });
        // this.alreadyUploadedAssessmentAttachment.splice(attachmentIndex, 1);
      }
    });
  }

  onAttachmentClick = (event) => {
    event.target.value = '';
  }

  onAttachmentSelection = (fileInput) => {
    const uploadedFiles = [...fileInput.target.files];
    this.surveyUpdateFormSubmit.emit({
      attachmentArray: uploadedFiles,
    });
  }

  getFileUrl = (attachment): Observable<any> => {
    const { company_id, path } = attachment;
    const filePath = `${company_id}/${path}`;
    console.log('survey-criteria-detail');
    return this.commonService.getFileUrl(filePath);
    // return this.commonService.getFileUrl(fileName);
  };

  onAttachmentPreview = (attachment) => {
    this.getFileUrl(attachment).subscribe(
      (response) => {
        const url = response.payload.url;
        const docType: DocumentViewTypeEnum = getDocType(url);

        this.documentPreviewDialogRef = this.dialog.open(
          DocumentPreviewDialogComponent, {
          panelClass: "document-preview-dialog",
        }
        );
        this.documentPreviewDialogRef.componentInstance.url = url;
        this.documentPreviewDialogRef.componentInstance.docType = docType;
        this.documentPreviewDialogRef.afterClosed().subscribe((result) => { });
      },
      (error) => { }
    )

    // const dialogRef = this.dialog.open(DocumentPreviewDialogComponent, {
    //   panelClass: "document-preview-dialog"
    // });

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

  questionTypeLabel(question) {
    const currentQuestionType = questionTypes.filter(
      (elem) => elem.value === question.type
    )[0];
    return (currentQuestionType && currentQuestionType.display) || '';
  }

  onCheckChangeSelectAllRequirements = (event) => {
    this.criteria.requirements = this.criteria.requirements.map((elem) => {
      elem.completed = event.checked;
      return elem;
    });
  }

  onCheckChangeSingleRequirement = (event, assessmentModelElement) => {
    const modelIndex = this.criteria.requirements.findIndex(
      (elem) => elem._id === assessmentModelElement._id
    );
    this.criteria.requirements[modelIndex].completed = event.checked;
  }

  isAllRequirementsCompleted = () => {
    return this.criteria.requirements.every((elem) => elem.completed);
  }

  editAssessmentCriteria = (criteriaId, assessmentId, params) => {
    return this.assessmentService.updateCriteriaDetail(
      criteriaId,
      assessmentId,
      params
    );
  }

  isSelected = (question, choice) => {
    const { answer = [] } = question;
    return answer.indexOf(choice) > -1
  }

  onSaveAssessmentRequirement = () => {
    const params = {
      requirements: this.criteria.requirements.map((el) => {
        const { _id, completed } = el;
        return { _id, completed };
      }),
    };
    this.editAssessmentCriteria(
      this.criteria.criteria_id,
      this.criteria.assessment_id,
      params
    ).subscribe(
      (response) => {
        this.updateAssessmentCriteriaRequirement.emit({
          requirements: this.criteria.requirements,
        });
      },
      (error) => { }
    );
  }
}
