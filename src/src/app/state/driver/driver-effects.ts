import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { DriversService } from '@services/drivers.service';
import { Observable, of } from 'rxjs';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  driverCreate,
  driverCreateSuccess,
  driverDelete,
  driverDeleteSuccess,
  driverError,
  driverGetAvailable,
  driverGetAvailableSuccess,
  driverGetList,
  driverGetListSuccess,
  driverUndelete,
  driverUpdate,
  driverUpdateSuccess,
} from './driver-actions';

@Injectable()
export class DriverEffects {
  constructor(
    private driversService: DriversService,
    private actions$: Actions
  ) {}

  driverGetList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(driverGetList),
      mergeMap((act) =>
        this.driversService.list(act.payload).pipe(
          map((drivers) => driverGetListSuccess({ payload: drivers })),
          catchError((err) => this.handleError(err))
        )
      )
    )
  );

  driverCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(driverCreate),
      mergeMap((act) =>
        this.driversService.create(act.payload).pipe(
          map((driver) => driverCreateSuccess({ payload: driver })),
          catchError((err) => this.handleError(err))
        )
      )
    )
  );

  driverUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(driverUpdate),
      mergeMap((act) =>
        this.driversService.update(act.id, act.payload).pipe(
          map((driver) => driverUpdateSuccess({ payload: driver })),
          catchError((err) => this.handleError(err))
        )
      )
    )
  );

  driverDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(driverDelete),
      mergeMap((act) =>
        this.driversService.delete(act.id).pipe(
          map((driver) => driverDeleteSuccess({ id: act.id })),
          catchError((err) => this.handleError(err))
        )
      )
    )
  );

  undeleteDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(driverUndelete),
      mergeMap((act) =>
        this.driversService.undelete(act.id).pipe(
          map((driver) => driverUpdateSuccess({ payload: driver })),
          catchError((err) => this.handleError(err))
        )
      )
    )
  );

  getActiveChassisEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(driverGetAvailable),
      mergeMap(() =>
        this.driversService.getActive().pipe(
          map((drivers) => driverGetAvailableSuccess({ payload: drivers })),
          catchError((err) => this.handleError(err))
        )
      )
    )
  );

  private handleError(err: any): Observable<Action> {
    if (err.status === 409) {
      return of(driverError({ errorMessage: err.error.translationKey }));
    }
    return of(
      driverError({
        errorMessage: 'Updating the driver failed due to an unknown error',
      })
    );
  }
}
