import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBaseComponent, questionTypes, ValidationConstant } from '@app/utility';

@Component({
  selector: 'app-question-details-dialog',
  templateUrl: './question-details-dialog.component.html',
  styleUrls: ['./question-details-dialog.component.scss'],
})
export class QuestionDetailsDialogComponent extends FormBaseComponent implements OnInit {
  // Form Group variables
  questionForm: FormGroup;

  // State variables
  isShowListOfChoice = false;
  question_choices: FormArray;
  questionTypesOptions = questionTypes;

  @Input() question;
  @Output() questionAddUpdate = new EventEmitter<any>();
  validationMsg = new ValidationConstant();

  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<QuestionDetailsDialogComponent>) {
    super(fb);
  }

  ngOnInit() {
    this.initialize();
  }

  initialize = () => {
    this.createQuestionForm(this.question);
    this.bindQuestionChoice(this.question);
  }

  createQuestionForm = (question) => {
    this.questionForm = this.createForm({
      // unique_id: [question ? question.unique_id : '', [Validators.required as any]],
      question: [question ? question.question : '', [Validators.required as any]],
      type: [question ? question.type : 1, [Validators.required as any]],
      question_choices: this.fb.array([]),
    });
  }

  bindQuestionChoice = (question) => {
    const questionChoices = this.questionForm.get('question_choices') as FormArray;
    if (question.type === 2) {
      this.isShowListOfChoice = true;
      question.question_choices.forEach(choice => {
        questionChoices.push(this.createItem(choice));
      });
    } else {
      questionChoices.push(this.createItem(null));
    }
  }

  createItem(item): FormGroup {
    return this.fb.group({
      questionChoice: item || '',
    });
  }

  onSubmitQuestionForm = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      const params = { ...form.value };
      if (this.isShowListOfChoice) {
        params.question_choices = params.question_choices.map(el => el.questionChoice);
      } else {
        delete params.question_choices;
      }
      this.questionAddUpdate.emit({ params });
    }
  }

  onChangeQuestionType = (event) => {
    const selectedType = event.value;
    this.isShowListOfChoice = selectedType === 2;
  }

  onAddChoice = (item = null) => {
    this.question_choices = this.questionForm.get('question_choices') as FormArray;
    this.question_choices.push(this.createItem(item));
  }

  deleteChoiceItem = (index) => {
    const questionChoices = this.questionForm.get('question_choices') as FormArray;
    questionChoices.removeAt(index);
  }

  onCloseDialog = () => {
    this.dialogRef.close();
  }

  get formControls() {
    return this.questionForm.controls;
  }

  get title() {
    return `${this.question ? 'Edit' : 'Add'} Question`;
  }

  get questionChoices() {
    return this.questionForm.get('question_choices') as FormArray;
  }

}
