import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { LeagueCreateDialogComponent } from '@pages/leagues/dialogs/league-create-dialog/league-create-dialog.component';
import { LeagueRequestDialogComponent } from '@pages/leagues/dialogs/league-request-dialog/league-request-dialog.component';
import { AppState } from '@state/app.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-league-toolbar',
  templateUrl: './league-toolbar.component.html',
  styleUrls: ['./league-toolbar.component.scss'],
})
export class LeagueToolbarComponent implements OnInit, OnDestroy {
  private selectedLeagueSubscription?: Subscription;

  leagueName: string | null = null;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  createLeagueDialog() {
    let dialogRef = this.dialog.open(LeagueCreateDialogComponent, {
      width: '600px',
    });
  }
  joinLeagueDialog() {
    let dialogRef = this.dialog.open(LeagueRequestDialogComponent, {
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
