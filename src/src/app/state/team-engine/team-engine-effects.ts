import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TeamsService } from '@services/teams.service';
import { notificationCreate } from '@state/notification/notification-actions';
import { NotificationMessageDto } from '@state/notification/notification-models';
import { teamGet } from '@state/team/team-actions';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import {
  teamEngineBuy,
  teamEngineFailure,
  teamEngineGet,
  teamEngineGetSuccess,
  teamEngineSell,
  teamEngineSellConfirmation,
  teamEngineSellConfirmationSuccess,
  teamEngineSellSuccess,
} from './team-engine-actions';

@Injectable()
export class TeamEngineEffects {
  constructor(private teamsService: TeamsService, private actions$: Actions) {}

  teamGetEngineEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamEngineGet),
      mergeMap((action) =>
        this.teamsService.getEngine(action.teamId).pipe(
          map((payload) => {
            return teamEngineGetSuccess({ payload: payload });
          }),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            return of(teamEngineFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  teamBuyEngineEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamEngineBuy),
      mergeMap((action) =>
        this.teamsService.buyEngine(action.engineId).pipe(
          mergeMap((payload) => [
            teamEngineGetSuccess({ payload: payload }),
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
            return of(teamEngineFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  teamSellEngineConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamEngineSellConfirmation),
      mergeMap((action) =>
        this.teamsService.sellEngineConfirmation(action.teamEngineId).pipe(
          map((payload) => {
            return teamEngineSellConfirmationSuccess({ payload: payload });
          }),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            return of(teamEngineFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );

  teamSellEngine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(teamEngineSell),
      mergeMap((action) =>
        this.teamsService.sellEngine(action.teamEngineId).pipe(
          mergeMap(() => [teamEngineSellSuccess(), teamGet()]),
          catchError((err) => {
            if (err.status === 409) {
              return of(
                notificationCreate({
                  message: new NotificationMessageDto(undefined, err.error),
                })
              );
            }
            return of(teamEngineFailure({ message: 'Unknown error' }));
          })
        )
      )
    )
  );
}
