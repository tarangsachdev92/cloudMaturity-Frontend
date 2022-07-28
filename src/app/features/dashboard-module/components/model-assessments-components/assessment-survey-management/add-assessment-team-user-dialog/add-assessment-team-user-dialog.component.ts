import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '@app/core';
import { FormBaseComponent } from '@app/utility';

@Component({
  selector: 'app-add-assessment-team-user-dialog',
  templateUrl: './add-assessment-team-user-dialog.component.html',
  styleUrls: ['./add-assessment-team-user-dialog.component.scss'],
})
export class AddAssessmentTeamUserDialogComponent
  extends FormBaseComponent implements OnInit {
  // Form Group Variables
  assessmentTeamForm: FormGroup;
  @Output() saveTeam = new EventEmitter<any>();
  @Input() allUserList = [];
  @Input() allowUserList = [];

  constructor(
    public dialogRef: MatDialogRef<AddAssessmentTeamUserDialogComponent>,
    _fb: FormBuilder
  ) {
    super(_fb);
  }

  ngOnInit() {
    this.initialize();
  }

  initialize = () => {
    this.assessmentTeamForm = this.createForm({
      members: ['', []],
    });
  }

  onSubmitAssessmentTeam = (form: FormGroup) => {
    if (this.onSubmit(form)) {
      this.saveTeam.emit({ params: form.value });
    }
  }

  onCloseDialog = () => {
    this.dialogRef.close();
  }
}
