import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TeamsService } from '@services/teams.service';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  teamCreate,
  teamCreateSuccess,
  teamErrorMessage,
  teamGet,
  teamGetSuccess,
  teamUpdate,
  teamUpdateSuccess,
} from './team-actions';

@Injectable()
export class TeamEffects {
  constructor(private teamsService: TeamsService, private actions$: Actions) {}

  teamGetEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamGet),
      mergeMap(() =>
        this.teamsService.getOwn().pipe(
          map((teamDetails) => teamGetSuccess({ payload: teamDetails })),
          catchError((err) => {
            if (err.status === 404) {
              return of(teamGetSuccess({ payload: undefined }));
            } else if (err.status === 409) {
              return of(teamErrorMessage({ message: err.error.message }));
            }
            return of(teamGetSuccess({ payload: undefined }));
          })
        )
      )
    )
  );

  teamCreateEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamCreate),
      mergeMap((action) =>
        this.teamsService.create(action.payload).pipe(
          map((teamDetails) => teamCreateSuccess({ payload: teamDetails })),
          catchError((err) => {
            if (err.status === 409) {
              return of(teamErrorMessage({ message: err.error.errorMessage }));
            } else {
              return of(
                teamErrorMessage({ message: 'An unknown error occured...' })
              );
            }
          })
        )
      )
    )
  );

  teamUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamUpdate),
      mergeMap((action) =>
        this.teamsService.update(action.payload).pipe(
          map((teamDetails) => teamUpdateSuccess({ payload: teamDetails })),
          catchError((err) => {
            if (err.status === 409) {
              return of(teamErrorMessage({ message: err.error.errorMessage }));
            } else {
              return of(
                teamErrorMessage({ message: 'An unknown error occured...' })
              );
            }
          })
        )
      )
    )
  );
}
