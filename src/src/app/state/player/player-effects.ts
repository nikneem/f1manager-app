import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlayersService } from '@services/players.service';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { resolvePlayer, resolvePlayerSuccess } from './player-actions';

@Injectable()
export class PlayerEffects {
  constructor(
    private playersService: PlayersService,
    private actions$: Actions,
    private router: Router
  ) {}

  resolvePlayerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resolvePlayer),
      mergeMap((action) =>
        this.playersService.resolve(action.payload).pipe(
          map((player) => ({
            type: resolvePlayerSuccess.type,
            payload: player,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
