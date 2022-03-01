import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { teamChassisSellConfirmation } from '@state/team-chassis/team-chassis-actions';
import { Subscription } from 'rxjs';
import { SellConfirmationDto } from '../../models/sell-confirmation-model';

@Component({
  selector: 'f1-sell-chassis',
  templateUrl: './sell-chassis.component.html',
  styleUrls: ['./sell-chassis.component.scss'],
})
export class SellChassisComponent implements OnInit {
  private loadingSubscription?: Subscription;
  private errorMessageSubscription?: Subscription;
  private sellProposalSubscription?: Subscription;

  public isLoading: boolean = false;
  public errorMessage?: string;
  public sellConfirmation?: SellConfirmationDto;
  private teamChassisId: string;

  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: { teamChassisId: string }
  ) {
    this.teamChassisId = data.teamChassisId;
  }

  ngOnInit(): void {
    this.loadingSubscription = this.store
      .select((str) => str.teamChassisState.isLoading)
      .subscribe((val) => (this.isLoading = val));
    this.errorMessageSubscription = this.store
      .select((str) => str.teamChassisState.errorMessage)
      .subscribe((val) => (this.errorMessage = val));
    this.sellProposalSubscription = this.store
      .select((str) => str.teamChassisState.sellConfirmation)
      .subscribe((val) => (this.sellConfirmation = val));

    this.store.dispatch(
      teamChassisSellConfirmation({ teamChassisId: this.teamChassisId })
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
