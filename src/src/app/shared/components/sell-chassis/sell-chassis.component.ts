import { Component, OnInit } from '@angular/core';
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
  private teamIdSubscription?: Subscription;
  private sellProposalSubscription?: Subscription;

  public isLoading: boolean = false;
  public errorMessage?: string;
  public sellConfirmation?: SellConfirmationDto;
  private teamId?: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loadingSubscription = this.store
      .select((str) => str.chassisState.isLoading)
      .subscribe((val) => (this.isLoading = val));
    this.errorMessageSubscription = this.store
      .select((str) => str.chassisState.errorMessage)
      .subscribe((val) => (this.errorMessage = val));
    this.sellProposalSubscription = this.store
      .select((str) => str.teamChassisState.sellConfirmation)
      .subscribe((val) => (this.sellConfirmation = val));
    this.teamIdSubscription = this.store
      .select((str) => str.teamState.id)
      .subscribe((val) => {
        this.teamId = val;
        if (this.teamId) {
          this.store.dispatch(
            teamChassisSellConfirmation({ teamId: this.teamId })
          );
        }
      });
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
    if (this.teamIdSubscription) {
      this.teamIdSubscription.unsubscribe();
    }
  }
}
