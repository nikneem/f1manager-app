import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import {
  leagueJoin,
  leagueJoinSuccess,
  leagueSearch,
} from '@state/league/league-actions';
import { LeagueListItemDto } from '@state/league/league-models';
import { Subscription } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'f1-league-request-dialog',
  templateUrl: './league-request-dialog.component.html',
  styleUrls: ['./league-request-dialog.component.scss'],
})
export class LeagueRequestDialogComponent implements OnInit, OnDestroy {
  public leagueName: FormGroup;
  private actionSubscription?: Subscription;
  private searchResultsSubscription?: Subscription;
  private loadingSubscription?: Subscription;

  public selectedRowIndex = -1;
  public leagues: Array<LeagueListItemDto>;
  public selectedLeague?: LeagueListItemDto;
  displayedColumns: string[] = ['name', 'membersCount'];

  public errorMessage?: string;
  public joinLoading: boolean = false;

  constructor(
    private store: Store<AppState>,
    private updates$: Actions,
    private dialogRef: MatDialogRef<LeagueRequestDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.leagueName = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.min(5),
        Validators.max(100),
      ]),
    });
    this.leagues = new Array<LeagueListItemDto>();
    this.leagueName.controls['name'].valueChanges
      .pipe(debounceTime(380))
      .subscribe((value) => {
        if (value?.length > 1) {
          this.store.dispatch(leagueSearch({ term: value }));
        }
      });
  }
  selectRow(league: LeagueListItemDto) {
    this.selectedLeague = league;
  }
  joinLeague(): void {
    if (this.selectedLeague?.id) {
      this.store.dispatch(leagueJoin({ id: this.selectedLeague.id }));
    }
  }

  ngOnInit(): void {
    this.actionSubscription = this.updates$
      .pipe(ofType(leagueJoinSuccess))
      .subscribe(() => {
        this.dialogRef.close();
      });
    this.searchResultsSubscription = this.store
      .select((str) => str.leaguesState.searchResults)
      .subscribe((leagues) => {
        if (leagues) {
          this.leagues = leagues;
        } else {
          this.leagues = new Array<LeagueListItemDto>();
        }
      });
    this.loadingSubscription = this.store
      .select((str) => str.leaguesState.leagueJoining)
      .subscribe((val) => (this.joinLoading = val));
  }
  ngOnDestroy(): void {
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
    if (this.searchResultsSubscription) {
      this.searchResultsSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
