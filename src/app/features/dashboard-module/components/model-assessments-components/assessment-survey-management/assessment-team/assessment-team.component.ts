import { Component, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssessmentService, CommonService } from '@app/core';
import { Observable, Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from '@app/utility';
import { AddAssessmentTeamUserDialogComponent } from '../add-assessment-team-user-dialog/add-assessment-team-user-dialog.component';

@Component({
  selector: 'app-assessment-team',
  templateUrl: './assessment-team.component.html',
  styleUrls: ['./assessment-team.component.scss'],
})
export class AssessmentTeamComponent implements OnInit, OnDestroy {
  constructor(public dialog: MatDialog, private assessmentService: AssessmentService,
    private commonService: CommonService) { }

  dialogRef;
  allUserList = [];
  isUserLoading = false;
  private deleteMemberSubscription$: Subscription;

  @Input() assessmentDetail;
  @Input() assessmentTeamList = [];
  @Input() isLoadingResults: boolean;

  ngOnInit() {
    this.bindAllUser();
  }

  onAddTeamMember = () => {
    if (!this.isLoadingResults && !this.isUserLoading) {
      const allowUserList = this.allUserList.filter(n => !this.assessmentTeamList.some(n2 => n._id === n2._id));
      this.dialogRef = this.dialog.open(AddAssessmentTeamUserDialogComponent, {
        width: '550px',
      });
      this.dialogRef.componentInstance.allowUserList = allowUserList;

      const sub = this.dialogRef.componentInstance.saveTeam.subscribe(
        (event) => {
          if (event) {
            const { params } = event;
            this.saveTeam(params, this.assessmentDetail._id);
          }
        }
      );

      this.dialogRef.afterClosed().subscribe((response) => {
        if (response && response.submit) {
          const members = response.members;
          if (members.length) {
            this.assessmentTeamList = JSON.parse(JSON.stringify(members));
          }
        }
        sub.unsubscribe();
      });
    }
  }

  saveTeam = (params, assessmentId) => {
    this.assessmentService.updateAssessmentTeam(params, assessmentId).subscribe(
      (response) => {
        if (this.dialogRef) {
          this.dialogRef.close({ submit: true, members: response.payload.data.members });
        }
      },
      (error) => { }
    );
  }


  deleteMembers = (membersIdArray = []): Observable<any> => {
    return this.assessmentService.deleteAssessmentTeamMember(
      this.assessmentDetail._id, { members: membersIdArray });
  }

  onDeleteTeamMember(event, member): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { message: 'Are you sure want to delete this member?', title: 'Delete Team member' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.submit) {
        if (this.deleteMemberSubscription$) { this.deleteMemberSubscription$.unsubscribe(); }
        this.deleteMemberSubscription$ = this.deleteMembers([member._id]).subscribe(response => {
          this.assessmentTeamList = this.assessmentTeamList.filter(elem => elem._id !== member._id);
        });
      }
    });
  }

  bindAllUser = () => {
    this.isUserLoading = true;
    this.commonService.getAllUserList(false).subscribe(response => {
      this.allUserList = response.payload.users.users;
      this.isUserLoading = false;
    }, error => {
      this.isUserLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.deleteMemberSubscription$) { this.deleteMemberSubscription$.unsubscribe(); }
  }

}
