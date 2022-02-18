import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ChassisService } from '@services/chassis.service';
import { of } from 'rxjs';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  chassisCreate,
  chassisCreateSuccess,
  chassisDelete,
  chassisDeleteSuccess,
  chassisError,
  chassisGetAvailable,
  chassisGetAvailableSuccess,
  chassisGetList,
  chassisGetListSuccess,
  chassisUndelete,
  chassisUndeleteSuccess,
  chassisUpdate,
  chassisUpdateSuccess,
} from './chassis-actions';

@Injectable()
export class ChassisEffects {
  constructor(
    private chassisService: ChassisService,
    private actions$: Actions
  ) {}

  chassisGetList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chassisGetList),
      mergeMap((act) =>
        this.chassisService.list(act.payload).pipe(
          map((chassis) => chassisGetListSuccess({ payload: chassis })),
          catchError(() => of(chassisError({ errorMessage: 'error' })))
        )
      )
    )
  );

  chassisCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chassisCreate),
      mergeMap((act) =>
        this.chassisService.create(act.payload).pipe(
          map((chassis) => chassisCreateSuccess({ payload: chassis })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  chassisUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chassisUpdate),
      mergeMap((act) =>
        this.chassisService.update(act.id, act.payload).pipe(
          map((chassis) => chassisUpdateSuccess({ payload: chassis })),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                chassisError({ errorMessage: err.error.translationKey })
              );
            }
            return of(
              chassisError({
                errorMessage:
                  'Updating the chassis failed due to an unknown error',
              })
            );
          })
        )
      )
    )
  );

  chassisDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chassisDelete),
      mergeMap((act) =>
        this.chassisService.delete(act.id).pipe(
          map(() => chassisDeleteSuccess({ id: act.id })),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                chassisError({ errorMessage: err.error.translationKey })
              );
            }
            return of(
              chassisError({
                errorMessage:
                  'Updating the chassis failed due to an unknown error',
              })
            );
          })
        )
      )
    )
  );

  undeleteDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chassisUndelete),
      mergeMap((act) =>
        this.chassisService.undelete(act.id).pipe(
          map((chassis) => chassisUndeleteSuccess({ id: act.id })),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                chassisError({ errorMessage: err.error.translationKey })
              );
            }
            return of(
              chassisError({
                errorMessage:
                  'Updating the chassis failed due to an unknown error',
              })
            );
          })
        )
      )
    )
  );

  getActiveChassisEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(chassisGetAvailable),
      mergeMap(() =>
        this.chassisService.getActive().pipe(
          map(
            (engines) => chassisGetAvailableSuccess({ payload: engines }),
            catchError(() => EMPTY)
          )
        )
      )
    )
  );
}
