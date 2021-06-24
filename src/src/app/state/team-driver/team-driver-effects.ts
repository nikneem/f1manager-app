import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TeamsService } from '@services/teams.service';
import { notificationCreate } from '@state/notification/notification-actions';
import { NotificationMessageDto } from '@state/notification/notification-models';
import { teamGet } from '@state/team/team-actions';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import {
  teamDriverBuyFirst,
  teamDriverBuyFirstSuccess,
  teamDriverBuySecond,
  teamDriverBuySecondSuccess,
  teamDriverFailure,
  teamDriverGetFirst,
  teamDriverGetFirstSuccess,
  teamDriverGetSecond,
  teamDriverGetSecondSuccess,
  teamDriverSell,
  teamDriverSellConfirmation,
  teamDriverSellConfirmationSuccess,
  teamDriverSellSuccess,
} from './team-driver-actions';

@Injectable()
export class TeamDriverEffects {
  constructor(private teamsService: TeamsService, private actions$: Actions) {}

  teamDriverGetFirst$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamDriverGetFirst),
      mergeMap((action) =>
        this.teamsService.getFirstDriver(action.teamId).pipe(
          map((payload) => {
            return teamDriverGetFirstSuccess({
              payload: payload,
            });
          }),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            if (err.status === 404) {
              return of(
                teamDriverGetFirstSuccess({
                  payload: undefined,
                })
              );
            }
            return of(teamDriverFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  teamDriverGetSecond$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamDriverGetSecond),
      mergeMap((action) =>
        this.teamsService.getSecondDriver(action.teamId).pipe(
          map((payload) => {
            return teamDriverGetSecondSuccess({
              payload: payload,
            });
          }),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            return of(teamDriverFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  teamDriverBuyFirst$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamDriverBuyFirst),
      mergeMap((action) =>
        this.teamsService.buyFirstDriver(action.driverId).pipe(
          mergeMap((payload) => [
            teamDriverBuyFirstSuccess({
              payload: payload,
            }),
            teamGet(),
          ]),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            return of(teamDriverFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  teamDriverBuySecond$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamDriverBuySecond),
      mergeMap((action) =>
        this.teamsService.buySecondDriver(action.driverId).pipe(
          mergeMap((payload) => [
            teamDriverBuySecondSuccess({
              payload: payload,
            }),
            teamGet(),
          ]),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            return of(teamDriverFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  teamSellDriverConfirmationEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamDriverSellConfirmation),
      mergeMap((action) =>
        this.teamsService.sellDriverConfirmation(action.teamDriverId).pipe(
          map((payload) => {
            return teamDriverSellConfirmationSuccess({ payload: payload });
          }),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            return of(teamDriverFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  teamSellDriverEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamDriverSell),
      mergeMap((action) =>
        this.teamsService.sellDriver(action.teamDriverId).pipe(
          mergeMap(() => [
            teamDriverSellSuccess({ teamDriverId: action.teamDriverId }),
            teamGet(),
          ]),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            return of(teamDriverFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );
}
