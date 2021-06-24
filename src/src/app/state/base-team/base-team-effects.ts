import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { BaseTeamService } from '@services/base-team.service';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  baseTeamCreate,
  baseTeamCreateSuccess,
  baseTeamDelete,
  baseTeamDeleteSuccess,
  baseTeamError,
  baseTeamGetList,
  baseTeamGetListSuccess,
  baseTeamUpdate,
  baseTeamUpdateSuccess,
} from './base-team-actions';

@Injectable()
export class BaseTeamEffects {
  constructor(
    private baseTeamService: BaseTeamService,
    private actions$: Actions
  ) {}

  baseTeamGetList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(baseTeamGetList),
      mergeMap((act) =>
        this.baseTeamService.list(act.payload).pipe(
          map((drivers) => baseTeamGetListSuccess({ payload: drivers })),
          catchError((err) => this.handleError(err))
        )
      )
    )
  );

  baseTeamCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(baseTeamCreate),
      mergeMap((act) =>
        this.baseTeamService.create(act.payload).pipe(
          map((drivers) => baseTeamCreateSuccess({ payload: drivers })),
          catchError((err) => this.handleError(err))
        )
      )
    )
  );
  baseTeamUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(baseTeamUpdate),
      mergeMap((act) =>
        this.baseTeamService.update(act.id, act.payload).pipe(
          map((drivers) => baseTeamUpdateSuccess({ payload: drivers })),
          catchError((err) => this.handleError(err))
        )
      )
    )
  );
  baseTeamDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(baseTeamDelete),
      mergeMap((act) =>
        this.baseTeamService.delete(act.id).pipe(
          map(() => baseTeamDeleteSuccess({ id: act.id })),
          catchError((err) => this.handleError(err))
        )
      )
    )
  );

  private handleError(err: any): Observable<Action> {
    if (err.status === 409) {
      return of(baseTeamError({ errorMessage: err.error.translationKey }));
    }
    return of(
      baseTeamError({
        errorMessage: 'Updating the base team failed due to an unknown error',
      })
    );
  }
}
