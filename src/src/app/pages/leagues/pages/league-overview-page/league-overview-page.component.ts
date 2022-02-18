import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LeagueCreateDialogComponent } from '@pages/leagues/dialogs/league-create-dialog/league-create-dialog.component';
import { LeagueRequestDialogComponent } from '@pages/leagues/dialogs/league-request-dialog/league-request-dialog.component';
import { AppState } from '@state/app.state';
import { leagueGetMine } from '@state/league/league-actions';
import { LeagueDto, LeagueListItemDto } from '@state/league/league-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-league-overview-page',
  templateUrl: './league-overview-page.component.html',
  styleUrls: ['./league-overview-page.component.scss'],
})
export class LeagueOverviewPageComponent implements OnInit, OnDestroy {
  private myLeaguesSubscription?: Subscription;
  private myLeaguesLoadingSubscription?: Subscription;

  public isLoadingMine: boolean = false;
  public mine?: Array<LeagueListItemDto>;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
    private router: Router
  ) {}

  createNewLeague() {
    this.dialog.open(LeagueCreateDialogComponent);
  }
  joinExistingLeague() {
    this.dialog.open(LeagueRequestDialogComponent);
  }
  leagueDetails(league: LeagueListItemDto) {
    this.router.navigate([`/leagues/details`, league.id]);
  }
  ngOnInit(): void {
    this.myLeaguesSubscription = this.store
      .select((str) => str.leaguesState.mine)
      .subscribe((val) => (this.mine = val));
    this.myLeaguesLoadingSubscription = this.store
      .select((str) => str.leaguesState.isLoadingMine)
      .subscribe((val) => (this.isLoadingMine = val));

    this.store.dispatch(leagueGetMine());
  }
  ngOnDestroy(): void {
    if (this.myLeaguesSubscription) {
      this.myLeaguesSubscription.unsubscribe();
    }
    if (this.myLeaguesLoadingSubscription) {
      this.myLeaguesLoadingSubscription.unsubscribe();
    }
  }
}
