import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LeaguesService } from '@services/leagues.service';
import { AppState } from '@state/app.state';
import {
  leagueCreate,
  leagueCreateSuccess,
} from '@state/league/league-actions';
import { LeagueCreateDto } from '@state/league/league-models';
import { of, Subscription } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'f1-league-create-dialog',
  templateUrl: './league-create-dialog.component.html',
  styleUrls: ['./league-create-dialog.component.scss'],
})
export class LeagueCreateDialogComponent implements OnInit, OnDestroy {
  public leagueName: FormGroup;
  private actionSubscription?: Subscription;

  constructor(
    private leaguesService: LeaguesService,
    private store: Store<AppState>,
    private updates$: Actions,
    private dialogRef: MatDialogRef<LeagueCreateDialogComponent>
  ) {
    this.leagueName = new FormGroup({
      name: new FormControl(
        '',
        [Validators.required, Validators.min(5), Validators.max(100)],
        [leagueValidator(this.leaguesService)]
      ),
    });
  }

  createLeague() {
    if (this.leagueName.valid) {
      let dto = new LeagueCreateDto(this.leagueName.value);
      this.store.dispatch(leagueCreate({ payload: dto }));
    }
  }

  ngOnInit(): void {
    this.actionSubscription = this.updates$
      .pipe(ofType(leagueCreateSuccess))
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
  ngOnDestroy(): void {
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
  }
}

export function leagueValidator(
  leaguesService: LeaguesService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return leaguesService
      .checkName(new LeagueCreateDto({ name: control.value }))
      .pipe(
        debounceTime(750),
        map(() => null),
        catchError(() => of({ leagueNameUnique: true }))
      );
  };
}
