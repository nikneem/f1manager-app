import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EngineService } from '@services/engine.service';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  engineGetAvailable,
  engineGetAvailableSuccess,
} from './engine-actions';

@Injectable()
export class EngineEffects {
  constructor(
    private engineService: EngineService,
    private actions$: Actions
  ) {}

  getActiveEngineEffect$ = createEffect(() =>
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
