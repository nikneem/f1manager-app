import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { teamEngineSellConfirmation } from '@state/team-engine/team-engine-actions';
import { Subscription } from 'rxjs';
import { SellConfirmationDto } from '../../models/sell-confirmation-model';

@Component({
  selector: 'f1-sell-engine',
  templateUrl: './sell-engine.component.html',
  styleUrls: ['./sell-engine.component.scss'],
})
export class SellEngineComponent implements OnInit, OnDestroy {
  private loadingSubscription?: Subscription;
  private errorMessageSubscription?: Subscription;
  private sellProposalSubscription?: Subscription;

  public isLoading: boolean = true;
  public errorMessage?: string;
  public sellConfirmation?: SellConfirmationDto;
  public teamEngineId: string;

  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: { teamEngineId: string }
  ) {
    this.teamEngineId = data.teamEngineId;
  }

  ngOnInit(): void {
    this.loadingSubscription = this.store
      .select((str) => str.teamEngineState.isLoading)
      .subscribe((val) => (this.isLoading = val));
    this.errorMessageSubscription = this.store
      .select((str) => str.teamEngineState.errorMessage)
      .subscribe((val) => (this.errorMessage = val));
    this.sellProposalSubscription = this.store
      .select((str) => str.teamEngineState.sellConfirmation)
      .subscribe((val) => (this.sellConfirmation = val));

    this.store.dispatch(
      teamEngineSellConfirmation({ teamEngineId: this.teamEngineId })
    );
  }
  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (this.errorMessageSubscription) {
      this.errorMessageSubscription.unsubscribe();
    }
    if (this.sellProposalSubscription) {
      this.sellProposalSubscription.unsubscribe();
    }
  }
}
