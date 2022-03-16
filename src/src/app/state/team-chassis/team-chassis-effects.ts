import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TeamsService } from '@services/teams.service';
import { notificationCreate } from '@state/notification/notification-actions';
import { NotificationMessageDto } from '@state/notification/notification-models';
import { teamGet } from '@state/team/team-actions';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import {
  teamChassisBuy,
  teamChassisFailure,
  teamChassisGet,
  teamChassisGetSuccess,
  teamChassisSell,
  teamChassisSellConfirmation,
  teamChassisSellConfirmationSuccess,
  teamChassisSellSuccess,
} from './team-chassis-actions';

@Injectable()
export class TeamChassisEffects {
  constructor(private teamsService: TeamsService, private actions$: Actions) {}

  teamGetChassisEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamChassisGet),
      mergeMap((action) =>
        this.teamsService.getChassis(action.teamId).pipe(
          map((payload) => {
            return teamChassisGetSuccess({ payload: payload });
          }),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            return of(teamChassisFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  teamBuyChassisEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamChassisBuy),
      mergeMap((action) =>
        this.teamsService.buyChassis(action.chassisId).pipe(
          mergeMap((payload) => [
            teamChassisGetSuccess({ payload: payload }),
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
            return of(teamChassisFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  teamSellChassisConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamChassisSellConfirmation),
      mergeMap((action) =>
        this.teamsService.sellChassisConfirmation(action.teamChassisId).pipe(
          map((payload) => {
            return teamChassisSellConfirmationSuccess({ payload: payload });
          }),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            return of(teamChassisFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  teamSellChassis$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamChassisSell),
      mergeMap((action) =>
        this.teamsService.sellChassis(action.teamId).pipe(
          mergeMap(() => [teamChassisSellSuccess(), teamGet()]),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            return of(teamChassisFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );
}
