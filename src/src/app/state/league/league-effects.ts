import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LeaguesService } from '@services/leagues.service';
import { TeamsService } from '@services/teams.service';
import { notifySnackbar } from '@state/notification/notification-actions';
import { from, of } from 'rxjs';
import { catchError, debounceTime, map, mergeMap } from 'rxjs/operators';
import {
  leagueAcceptRequest,
  leagueAcceptRequestSuccess,
  leagueCreate,
  leagueCreateFailed,
  leagueCreateSuccess,
  leagueDeclineRequest,
  leagueDeclineRequestSuccess,
  leagueFailed,
  leagueGet,
  leagueGetMembers,
  leagueGetMembersSuccess,
  leagueGetMine,
  leagueGetMineFailed,
  leagueGetMineSuccess,
  leagueGetRequests,
  leagueGetRequestsSuccess,
  leagueGetSuccess,
  leagueJoin,
  leagueJoinFailed,
  leagueJoinSuccess,
  leagueSearch,
  leagueSearchSuccess,
} from './league-actions';
import { LeagueListItemDto } from './league-models';

@Injectable()
export class LeagueEffects {
  constructor(
    private leaguesService: LeaguesService,
    private teamsService: TeamsService,
    private actions$: Actions
  ) {}

  leagueGetMine$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leagueGetMine),
      mergeMap(() =>
        this.leaguesService.myLeagues().pipe(
          map(
            (leagues) => leagueGetMineSuccess({ payload: leagues }),
            catchError(() =>
              of(leagueGetMineFailed({ errorMessage: 'loadfailed' }))
            )
          )
        )
      )
    )
  );

  leagueGet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leagueGet),
      mergeMap((action) =>
        this.leaguesService.get(action.leagueId).pipe(
          map((league) => leagueGetSuccess({ payload: league })),
          catchError((err) => {
            if (err.status === 409) {
              return of(leagueFailed({ errorMessage: err.error.errorMessage }));
            } else {
              return of(
                leagueFailed({
                  errorMessage: 'An unknown error occured...',
                })
              );
            }
          })
        )
      )
    )
  );

  leagueGetMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leagueGetMembers),
      mergeMap((action) =>
        this.teamsService.search(action.filter).pipe(
          map((payload) =>
            leagueGetMembersSuccess({ members: payload.entities })
          ),
          catchError((err) => {
            if (err.status === 409) {
              return of(leagueFailed({ errorMessage: err.error.errorMessage }));
            } else {
              return of(
                leagueFailed({
                  errorMessage: 'An unknown error occured...',
                })
              );
            }
          })
        )
      )
    )
  );
  leagueGetRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leagueGetRequests),
      mergeMap((action) =>
        this.leaguesService.getRequests(action.leagueId).pipe(
          map((league) => leagueGetRequestsSuccess({ payload: league })),
          catchError((err) => {
            if (err.status === 409) {
              return of(leagueFailed({ errorMessage: err.error.errorMessage }));
            } else {
              return of(
                leagueFailed({
                  errorMessage: 'An unknown error occured...',
                })
              );
            }
          })
        )
      )
    )
  );

  leagueAcceptRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leagueAcceptRequest),
      mergeMap((action) =>
        this.leaguesService.acceptRequest(action.leagueId, action.teamId).pipe(
          mergeMap(() => [
            leagueAcceptRequestSuccess({ teamId: action.teamId }),
          ]),
          catchError((err) => {
            if (err.status === 409) {
              return of(leagueFailed({ errorMessage: err.error.errorMessage }));
            } else {
              return of(
                leagueFailed({
                  errorMessage: 'An unknown error occured...',
                })
              );
            }
          })
        )
      )
    )
  );
  leagueDeclineRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leagueDeclineRequest),
      mergeMap((action) =>
        this.leaguesService.declineRequest(action.leagueId, action.teamId).pipe(
          map(() => leagueAcceptRequestSuccess({ teamId: action.teamId })),
          catchError((err) => {
            if (err.status === 409) {
              return of(leagueFailed({ errorMessage: err.error.errorMessage }));
            } else {
              return of(
                leagueFailed({
                  errorMessage: 'An unknown error occured...',
                })
              );
            }
          })
        )
      )
    )
  );

  leagueCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leagueCreate),
      mergeMap((action) =>
        this.leaguesService.create(action.payload).pipe(
          map(
            (league) => leagueCreateSuccess({ payload: league }),
            catchError((err) => {
              if (err.status === 409) {
                return of(
                  leagueCreateFailed({ errorMessage: err.error.errorMessage })
                );
              } else {
                return of(
                  leagueCreateFailed({
                    errorMessage: 'An unknown error occured...',
                  })
                );
              }
            })
          )
        )
      )
    )
  );

  leagueSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leagueSearch),
      debounceTime(380),
      mergeMap((action) =>
        this.leaguesService.search(action.term).pipe(
          map(
            (leagues) => leagueSearchSuccess({ payload: leagues.entities }),
            catchError(() =>
              of(
                leagueSearchSuccess({ payload: new Array<LeagueListItemDto>() })
              )
            )
          )
        )
      )
    )
  );

  leagueJoin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(leagueJoin),
      mergeMap((action) =>
        this.leaguesService.join(action.id).pipe(
          map(() => leagueJoinSuccess()),
          catchError((err) => {
            if (err.status === 409) {
              return from([
                notifySnackbar({ translationKey: err.error.translationKey }),
                leagueJoinFailed({ errorMessage: err.error.errorMessage }),
              ]);
            } else {
              return of(
                leagueJoinFailed({
                  errorMessage: 'An unknown error occured...',
                })
              );
            }
          })
        )
      )
    )
  );
}
