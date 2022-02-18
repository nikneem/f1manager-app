import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EngineService } from '@services/engine.service';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  engineCreate,
  engineCreateSuccess,
  engineDelete,
  engineDeleteSuccess,
  engineError,
  engineGetAvailable,
  engineGetAvailableSuccess,
  engineGetList,
  engineGetListSuccess,
  engineUndelete,
  engineUndeleteSuccess,
  engineUpdate,
  engineUpdateSuccess,
} from './engine-actions';

@Injectable()
export class EngineEffects {
  constructor(
    private engineService: EngineService,
    private actions$: Actions
  ) {}

  engineGetList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(engineGetList),
      mergeMap((act) =>
        this.engineService.list(act.payload).pipe(
          map((engines) => engineGetListSuccess({ payload: engines })),
          catchError(() => of(engineError({ errorMessage: 'error' })))
        )
      )
    )
  );

  engineCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(engineCreate),
      mergeMap((act) =>
        this.engineService.create(act.payload).pipe(
          map((chassis) => engineCreateSuccess({ payload: chassis })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  engineUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(engineUpdate),
      mergeMap((act) =>
        this.engineService.update(act.id, act.payload).pipe(
          map((engine) => engineUpdateSuccess({ payload: engine })),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                engineError({ errorMessage: err.error.translationKey })
              );
            }
            return of(
              engineError({
                errorMessage:
                  'Updating the chassis failed due to an unknown error',
              })
            );
          })
        )
      )
    )
  );

  engineDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(engineDelete),
      mergeMap((act) =>
        this.engineService.delete(act.id).pipe(
          map(() => engineDeleteSuccess({ id: act.id })),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                engineError({ errorMessage: err.error.translationKey })
              );
            }
            return of(
              engineError({
                errorMessage:
                  'Updating the chassis failed due to an unknown error',
              })
            );
          })
        )
      )
    )
  );

  engineUndelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(engineUndelete),
      mergeMap((act) =>
        this.engineService.undelete(act.id).pipe(
          map((chassis) => engineUndeleteSuccess({ id: act.id })),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                engineError({ errorMessage: err.error.translationKey })
              );
            }
            return of(
              engineError({
                errorMessage:
                  'Updating the chassis failed due to an unknown error',
              })
            );
          })
        )
      )
    )
  );

  engineGetAvailable$ = createEffect(() =>
    this.actions$.pipe(
      ofType(engineGetAvailable),
      mergeMap(() =>
        this.engineService.getActive().pipe(
          map(
            (engines) => engineGetAvailableSuccess({ payload: engines }),
            catchError(() => EMPTY)
          )
        )
      )
    )
  );
}
