import { Component, HostListener, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '@app/core';
import { AssessmentQuestionnaireService } from '@app/features/dashboard-module/services';
import { FormBaseComponent, prepareElementsTreeData, QuestionTypeEnum, removeBlankValue } from '@app/utility';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assessment-questionnaire-details',
  templateUrl: './assessment-questionnaire-details.component.html',
  styleUrls: ['./assessment-questionnaire-details.component.scss']
})
export class AssessmentQuestionnaireDetailsComponent extends FormBaseComponent implements OnInit {

  inputTypeAnswerCtrl: FormControl = new FormControl('');
  radioTypeAnswerCtrl: FormControl = new FormControl('');
  checkboxTypeAnswerCtrl: FormControl = new FormControl('');
  searchQuestionCtrl: FormControl = new FormControl('');

  levelCtrl: FormControl = new FormControl('');
  assignedToCtrl: FormControl = new FormControl('');
  criteriaCtrl: FormControl = new FormControl('');
  elementCtrl: FormControl = new FormControl('');
  elementStoreValue = '';
  questionLoader = false;
  originalQuestions = [];
  allQuestions = [];
  questionnaireProgress = 0;
  answeredQuestions = 0;
  totalQuestions = 0;
  displayQuestionsList = [];

  // Form Group variables
  assigneeForm: FormGroup;

  // Progress bar variables
  gaugeType = "semi";
  gaugeValue = "47";
  gaugeLabel = "";
  gaugeAppendText = "%";
  gaugeSize = 140;
  gaugeThick = 9;
  gaugeClr = "rgb(214, 79, 79)";
  levels = [];
  allUserList = [];
  isUserLoading = false;
  criteriaList = [];
  elementNodes = [];

  @Input() elementList = [];
  @Input() assessmentDetail;
  @Input() assessmentId;

  // State variables
  isApplied = true;
  isCriteriaShowAll = true;
  allChildElementList = [];
  questionnaireSubscriber$: Subscription;
  questionType = QuestionTypeEnum;

  constructor(_fb: FormBuilder, private commonService: CommonService,
    private assessmentQuestionnaireService: AssessmentQuestionnaireService) {
    super(_fb);
  }

  ngOnInit() {
    this.elementCtrl.valueChanges.subscribe(e => {
      if (e === null) {
        if (this.elementStoreValue) {
          this.bindCriteriaList();
        }
        this.elementCtrl.setValue("", { emitEvent: false });
        this.elementStoreValue = '';
      } else {
        this.bindCriteriaList();
        this.elementStoreValue = e;
      }
    })

    this.initialize();
    this.bindAllUser();
  }

  initialize = () => {
    this.createAssigneeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.elementList) {
      const change = changes.elementList;
      if (change.currentValue) {
        const mapElement: any = { title: 'All', value: '', key: '', children: [], isLeaf: true };
        const elementNodes = prepareElementsTreeData(this.elementList, true);
        this.elementNodes = [{ ...mapElement }].concat(elementNodes)
      }
    }

    if (changes.assessmentDetail) {
      const change = changes.assessmentDetail;
      const { currentValue } = change;
      if (currentValue) {
        this.bindLevels(+currentValue.evaluation_level);
      }
    }

    if (changes.assessmentId) {
      const change = changes.assessmentId;
      const { currentValue } = change;
      if (currentValue) {
        this.initialize();
        this.bindCriteriaList();
      }
    }

  }

  onChangeSearch = (event) => {
    this.filterQuestionList();
  }

  bindAllUser = () => {
    this.isUserLoading = true;
    this.commonService.getAllUserList(false).subscribe(
      (response) => {
        this.allUserList = response.payload.users.users;
        this.isUserLoading = false;
      },
      (error) => {
        this.isUserLoading = false;
      }
    );
  };

  bindCriteriaList = () => {
    if (this.assessmentId) {
      this.getQuestionnaireCriteria().subscribe(response => {
        this.handleQuestionnaireCriteria(response);
      }, error => { })
    }
  }

  getQuestionnaireCriteria = () => {
    return this.assessmentQuestionnaireService.getQuestionnaireCriteria(
      this.assessmentId, this.questionnaireCriteriaApiParams
    )
  }

  handleQuestionnaireCriteria = (response) => {
    this.criteriaList = response.payload.criterias;
  }

  get questionnaireCriteriaApiParams() {
    const params = removeBlankValue({ element_id: this.elementCtrl.value, level: this.levelCtrl.value });
    return params;
  }

  get questionnaireApiParams() {
    const params = removeBlankValue({
      element_id: this.elementCtrl.value, level: this.levelCtrl.value,
      assigned_to: this.assignedToCtrl.value, criteria_id: this.criteriaCtrl.value
    });
    return params;
  }

  get assigneeApiParams() {
    const params: any = { ...this.assigneeForm.value };
    params.questions = this.allQuestions.filter(e => e.checked).map(e => e._id)
    return params;
  }

  bindLevels = (levelNumber: number) => {
    this.levels = [];
    for (let i = 1; i <= levelNumber; i++) {
      this.levels.push(i);
    }
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (window.pageYOffset > 145) {
      const element = document.getElementById("questionnaireRight");
      if (element) {
        element.classList.add("fix-questionnaire-right");
      }
    } else {
      const element = document.getElementById("questionnaireRight");
      if (element) {
        element.classList.remove("fix-questionnaire-right");
      }
    }
  }

  createAssigneeForm = () => {
    this.assigneeForm = this.createForm({
      assigned_to: ['', [<any>Validators.required]]
    });
  }

  onSubmitAssigneeForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.assignQuestion().subscribe(response => {
        this.bindQuestions();
        this.assigneeForm.reset();
      }, error => { });
    }
  }
  isAllChecked = () => {
    return this.allQuestions.length && this.allQuestions.every((elem) => elem.checked);
  };

  onApplyButtonClick = () => {
    if (this.assessmentId) {
      this.isApplied = true;
      this.bindQuestions()
    }
  }

  bindQuestions = () => {
    this.questionLoader = true;
    this.getQuestions().subscribe(res => {
      this.handleQuestionResponse(res);
    }, error => {
      this.questionLoader = false;
    })
  }

  handleQuestionResponse = (response) => {
    const { questions, progress, totalQuestions, answeredQuestions } = response.payload;
    this.handleQuestionProgress(progress, totalQuestions, answeredQuestions);
    this.allQuestions = questions;
    this.originalQuestions = { ...questions };
    this.allQuestions.forEach((e, i) => { e.question_index = i + 1; })
    this.filterQuestionList();
    this.questionLoader = false;
  }

  handleQuestionProgress = (progress, totalQuestions, answeredQuestions) => {
    this.questionnaireProgress = progress;
    this.answeredQuestions = answeredQuestions;
    this.totalQuestions = totalQuestions;
  }

  getCriteria = (criteriaId) => {
    const criteria = this.criteriaList.find(e => e.criteria_id === criteriaId);
    return criteria && criteria.criteria_unique_id;
  }

  filterQuestionList = () => {
    const search = this.searchQuestionCtrl.value;
    this.displayQuestionsList = this.allQuestions.filter(e => e.question.toLowerCase().indexOf(search.toLowerCase()) > -1);
  }

  getQuestions = () => {
    return this.assessmentQuestionnaireService.getQuestionsList(this.assessmentId, this.questionnaireApiParams)
  }

  assignQuestion = () => {
    return this.assessmentQuestionnaireService.assignQuestion(this.assessmentId, this.assigneeApiParams)
  }

  answerQuestion = (assessmentId, questionId, params) => {
    return this.assessmentQuestionnaireService.answerQuestion(assessmentId, questionId, params)
  }

  updateAnswerForTheGivenQuestion = (assessmentId, question, params) => {
    this.answerQuestion(assessmentId, question._id, params).subscribe(response => {
      const questionIndex = this.allQuestions.findIndex(e => e._id === question._id);
      const { question: updatedQuestion, progress, totalQuestions, answeredQuestions } = response.payload
      this.allQuestions[questionIndex] = updatedQuestion;
      this.handleQuestionProgress(progress, totalQuestions, answeredQuestions);
      this.allQuestions.forEach((e, i) => { e.question_index = i + 1; })
      this.originalQuestions = [...this.allQuestions];
      this.filterQuestionList();
    }, error => { })
  }

  onChangeType1Answer = (event, question) => {
    const params = { answer: event.value }
    this.updateAnswerForTheGivenQuestion(this.assessmentId, question, params);
  }

  onType2Answer = (question) => {
    const answer = question.newAnswer.map(e => e.choice);
    const params = { answer };
    this.updateAnswerForTheGivenQuestion(this.assessmentId, question, params);
  }

  onType3Answer = (question) => {
    const answer = question.newAnswer;
    const params = { answer };
    this.updateAnswerForTheGivenQuestion(this.assessmentId, question, params);
  }

  onChangeType3Answer = (event, question) => {
    question.newAnswer = event.target.value;
    if (!question.isUpdated) this.applyUpdateQuestionCheck(question)
  }

  isChecked = (choice, question) => {
    const answer: any[] = question && question.answer || [];
    return answer.some(e => e === choice);
  }

  applyUpdateQuestionCheck = (question) => {
    const questionIndex = this.allQuestions.findIndex(e => e._id === question._id);
    this.allQuestions[questionIndex].isUpdated = true;
    this.filterQuestionList();
  }

  onCheckType2Option = (event, question, choiceIndex) => {
    if (!question.newAnswer) {
      const { answer = [] } = question;
      question.newAnswer = answer.map((e, i) => {
        return { choice: e, choiceIndex: i }
      })
    }
    if (event.checked) {
      question.newAnswer.push({ choice: question.question_choices[choiceIndex], choiceIndex })
    } else {
      const cIndex = question.newAnswer.findIndex(e => e.choiceIndex === choiceIndex)
      if (cIndex > -1) {
        question.newAnswer.splice(cIndex, 1);
      }
    }
    if (!question.isUpdated) this.applyUpdateQuestionCheck(question)
  }

  onSelectAllQuestion = (event) => {
    this.allQuestions.forEach(e => e.checked = event.checked);
  }

  onSelectQuestion = (event, questionId) => {
    const questionIndex = this.allQuestions.findIndex(e => e._id === questionId)
    this.allQuestions[questionIndex].checked = event.checked;
  }

  getCheckedQuestion = () => {
    return this.allQuestions.filter(e => e.checked);
  }

  get isShowAssigneeForm() {
    return this.allQuestions.length && this.allQuestions.some((elem) => elem.checked);
  }

}
