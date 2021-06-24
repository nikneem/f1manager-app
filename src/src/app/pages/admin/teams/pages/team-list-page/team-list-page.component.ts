import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@state/app.state';
import {
  baseTeamDelete,
  baseTeamGetList,
} from '@state/base-team/base-team-actions';
import { BaseTeamDto } from '@state/base-team/base-team-models';
import { Subscription } from 'rxjs';
import { BaseTeamDetailsDialogComponent } from '../../dialogs/base-team-details-dialog/base-team-details-dialog.component';

@Component({
  selector: 'f1-team-list-page',
  templateUrl: './team-list-page.component.html',
  styleUrls: ['./team-list-page.component.scss'],
})
export class TeamListPageComponent implements OnInit, OnDestroy {
  private baseTeamSubscription?: Subscription;
  private baseTeamFilterSubscription?: Subscription;
  private isLoadingSubscription?: Subscription;

  public baseTeams?: Array<BaseTeamDto>;
  public isLoading = false;

  displayedColumns: string[] = [
    'name',
    'origin',
    'principal',
    'firstDriver',
    'secondDriver',
    'engine',
    'chassis',
    'actions',
  ];

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private translateService: TranslateService
  ) {}

  createBaseTeam() {
    this.dialog.open(BaseTeamDetailsDialogComponent, {
      width: '80%',
    });
  }
  editBaseTeam(driver: BaseTeamDto) {
    this.dialog.open(BaseTeamDetailsDialogComponent, {
      width: '80%',
      data: { driver: driver },
    });
  }
  deleteBaseTeam(baseTeam: BaseTeamDto) {
    if (baseTeam.id) {
      const baseTeamId: string = baseTeam.id;
      this.translateService
        .get(
          ['admin.base-teams.delete.title', 'admin.base-teams.delete.message'],
          {
            name: baseTeam.name,
          }
        )
        .subscribe((val) => {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
              title: val['admin.base-teams.delete.title'],
              message: val['admin.base-teams.delete.message'],
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.store.dispatch(baseTeamDelete({ id: baseTeamId }));
            }
          });
        });
    }
  }

  ngOnInit(): void {
    this.baseTeamSubscription = this.store
      .select((str) => str.baseTeamState.baseTeams)
      .subscribe((val) => (this.baseTeams = val));
    this.baseTeamFilterSubscription = this.store
      .select((str) => str.baseTeamState.filter)
      .subscribe((val) => {
        this.store.dispatch(baseTeamGetList({ payload: val }));
      });
    this.isLoadingSubscription = this.store
      .select((str) => str.baseTeamState.isLoading)
      .subscribe((val) => (this.isLoading = val));
  }
  ngOnDestroy(): void {
    if (this.baseTeamSubscription) {
      this.baseTeamSubscription.unsubscribe();
    }
    if (this.baseTeamFilterSubscription) {
      this.baseTeamFilterSubscription.unsubscribe();
    }
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }
}
