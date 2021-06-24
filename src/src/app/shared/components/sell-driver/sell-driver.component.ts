import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { teamDriverSellConfirmation } from '@state/team-driver/team-driver-actions';
import { Subscription } from 'rxjs';
import { SellConfirmationDto } from '../../models/sell-confirmation-model';

@Component({
  selector: 'f1-sell-driver',
  templateUrl: './sell-driver.component.html',
  styleUrls: ['./sell-driver.component.scss'],
})
export class SellDriverComponent implements OnInit, OnDestroy {
  private loadingSubscription?: Subscription;
  private errorMessageSubscription?: Subscription;
  private sellProposalSubscription?: Subscription;

  public isLoading: boolean = true;
  public errorMessage?: string;
  public sellConfirmation?: SellConfirmationDto;
  public teamDriverId: string;

  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: { teamDriverId: string }
  ) {
    this.teamDriverId = data.teamDriverId;
  }

  ngOnInit(): void {
    this.loadingSubscription = this.store
      .select((str) => str.teamDriverState.isLoading)
      .subscribe((val) => (this.isLoading = val));
    this.errorMessageSubscription = this.store
      .select((str) => str.teamDriverState.errorMessage)
      .subscribe((val) => (this.errorMessage = val));
    this.sellProposalSubscription = this.store
      .select((str) => str.teamDriverState.sellConfirmation)
      .subscribe((val) => (this.sellConfirmation = val));

    this.store.dispatch(
      teamDriverSellConfirmation({ teamDriverId: this.teamDriverId })
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
