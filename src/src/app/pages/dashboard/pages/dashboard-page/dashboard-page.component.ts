import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectEngineComponent } from '@components/select-engine/select-engine.component';
import { Store } from '@ngrx/store';
import { TeamCreateDialogComponent } from '@pages/dashboard/dialogs/team-create-dialog/team-create-dialog.component';
import { AppState } from '@state/app.state';
import { teamGet, teamCreate } from '@state/team/team-actions';
import { TeamDetailsDto, TeamCreateDto } from '@state/team/team-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  private teamIdSubscription?: Subscription;
  private isLoadingSubscription?: Subscription;
  private teamDetailsSubscription?: Subscription;

  public isLoading: boolean = true;
  public teamId?: string;
  public dto?: TeamDetailsDto;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  public getTeam() {
    this.store.dispatch(teamGet());
  }

  public createTeam() {
    let dialogRef = this.dialog.open(TeamCreateDialogComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      let dto = new TeamCreateDto({ name: result });
      this.store.dispatch(teamCreate({ payload: dto }));
    });
  }

  public buyEngine() {
    let dialogRef = this.dialog.open(SelectEngineComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      alert(`Buying engine ${result}`);
    });
  }

  ngOnInit(): void {
    this.teamIdSubscription = this.store
      .select((str) => str.teamState.id)
      .subscribe((val) => {
        this.teamId = val;
      });
    this.teamDetailsSubscription = this.store
      .select((str) => str.teamState.model)
      .subscribe((val) => (this.dto = val));
    this.isLoadingSubscription = this.store
      .select((str) => str.teamState.isLoading)
      .subscribe((val) => {
        this.isLoading = val;
      });
    this.getTeam();
  }
  ngOnDestroy(): void {
    if (this.teamIdSubscription) {
      this.teamIdSubscription.unsubscribe();
    }
    if (this.teamDetailsSubscription) {
      this.teamDetailsSubscription.unsubscribe();
    }
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }
}
