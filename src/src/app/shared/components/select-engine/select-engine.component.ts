import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { engineGetAvailable } from '@state/engine/engine-actions';
import { EngineDto } from '@state/engine/engine-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-select-engine',
  templateUrl: './select-engine.component.html',
  styleUrls: ['./select-engine.component.scss'],
})
export class SelectEngineComponent implements OnInit, OnDestroy {
  private loadingSubscription?: Subscription;
  private errorMessageSubscription?: Subscription;
  private engineListSubscription?: Subscription;

  public isLoading: boolean = false;
  public errorMessage?: string;
  public engines?: Array<EngineDto>;
  public selectedEngine: EngineDto | undefined;

  constructor(private store: Store<AppState>) {}

  selectEngine(engine: EngineDto) {
    this.selectedEngine = engine;
  }
  ngOnInit(): void {
    this.loadingSubscription = this.store
      .select((str) => str.engineState.isLoading)
      .subscribe((val) => (this.isLoading = val));
    this.errorMessageSubscription = this.store
      .select((str) => str.engineState.errorMessage)
      .subscribe((val) => (this.errorMessage = val));
    this.engineListSubscription = this.store
      .select((str) => str.engineState.activeEngines)
      .subscribe((val) => {
        this.engines = val;
      });

    this.store.dispatch(engineGetAvailable());
  }
  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (this.errorMessageSubscription) {
      this.errorMessageSubscription.unsubscribe();
    }
    if (this.engineListSubscription) {
      this.engineListSubscription.unsubscribe();
    }
  }
}
