import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectDriverComponent } from '@components/select-driver/select-driver.component';
import { SellDriverComponent } from '@components/sell-driver/sell-driver.component';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { DriverDto } from '@state/driver/driver-models';
import {
  teamDriverBuyFirst,
  teamDriverSell,
  teamDriverGetFirst,
  teamDriverBuySecond,
  teamDriverGetSecond,
} from '@state/team-driver/team-driver-actions';
import { TeamDriverDto } from '@state/team-driver/team-driver-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-team-second-driver',
  templateUrl: './team-second-driver.component.html',
  styleUrls: ['./team-second-driver.component.scss'],
})
export class TeamSecondDriverComponent implements OnInit, OnDestroy {
  private teamDriverChangedSubscription?: Subscription;
  private availableDriversSubscription?: Subscription;

  @Input() public teamId?: string;

  public driverInfo?: DriverDto;
  public driver?: TeamDriverDto;
  public isLoading: boolean = true;
  public errorMessage?: string;
  public availableDrivers?: Array<DriverDto>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  public buyDriver() {
    let dialogRef = this.dialog.open(SelectDriverComponent, {
      width: '80%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(teamDriverBuySecond({ driverId: result }));
      }
    });
  }
  public sellDriver() {
    let dialogRef = this.dialog.open(SellDriverComponent, {
      width: '600px',
      data: { teamDriverId: this.driver?.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`Selling chassis ${result}`);
        this.store.dispatch(teamDriverSell({ teamDriverId: result }));
      }
    });
  }
  public enrichDriverInformation() {
    if (this.availableDrivers && this.driver?.driverId) {
      const driverIndex = this.availableDrivers.findIndex(
        (elm) => elm.id === this.driver?.driverId
      );
      if (driverIndex >= 0) {
        this.driverInfo = this.availableDrivers[driverIndex];
      }
    }
  }

  private loadTeamDriverDetails(teamId: string) {
    this.store.dispatch(
      teamDriverGetSecond({
        teamId: teamId,
      })
    );
  }

  ngOnInit(): void {
    if (this.teamId) {
      this.loadTeamDriverDetails(this.teamId);
    }
    this.teamDriverChangedSubscription = this.store
      .select((str) => str.teamDriverState.secondDriver)
      .subscribe((val) => {
        this.driver = val;
        this.enrichDriverInformation();
      });
    this.availableDriversSubscription = this.store
      .select((str) => str.driverState.activeDrivers)
      .subscribe((val) => {
        this.availableDrivers = val;
        this.enrichDriverInformation();
      });
  }
  ngOnDestroy(): void {
    if (this.teamDriverChangedSubscription) {
      this.teamDriverChangedSubscription.unsubscribe();
    }
    if (this.availableDriversSubscription) {
      this.availableDriversSubscription.unsubscribe();
    }
  }
}
