import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { LeagueInviteDialogComponent } from '@pages/leagues/dialogs/league-invite-dialog/league-invite-dialog.component';
import { AppState } from '@state/app.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-league-details-toolbar',
  templateUrl: './league-details-toolbar.component.html',
  styleUrls: ['./league-details-toolbar.component.scss'],
})
export class LeagueDetailsToolbarComponent implements OnInit, OnDestroy {
  private selectedLeagueSubscription?: Subscription;

  leagueName: string | null = null;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  inviteTeam() {
    let dialogRef = this.dialog.open(LeagueInviteDialogComponent, {
      width: '600px',
    });
  }
  ngOnInit(): void {
    this.selectedLeagueSubscription = this.store
      .select((str) => str.leaguesState.league)
      .subscribe((val) => {
        this.leagueName = null;
        if (val?.name) {
          this.leagueName = val.name;
        }
      });
  }
  ngOnDestroy(): void {
    if (this.selectedLeagueSubscription) {
      this.selectedLeagueSubscription.unsubscribe();
    }
  }
}
