import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectChassisComponent } from '@components/select-chassis/select-chassis.component';
import { SellChassisComponent } from '@components/sell-chassis/sell-chassis.component';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import {
  teamChassisBuy,
  teamChassisGet,
  teamChassisSell,
} from '@state/team-chassis/team-chassis-actions';
import { TeamChassisDto } from '@state/team-chassis/team-chassis-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-team-chassis',
  templateUrl: './team-chassis.component.html',
  styleUrls: ['./team-chassis.component.scss'],
})
export class TeamChassisComponent implements OnInit {
  private teamChassisSubscription?: Subscription;

  @Input() public teamId?: string;

  public chassis?: TeamChassisDto;
  public isLoading: boolean = true;
  public errorMessage?: string;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  public buyChassis() {
    let dialogRef = this.dialog.open(SelectChassisComponent, {
      width: '80%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(teamChassisBuy({ chassisId: result }));
      }
    });
  }
  public sellChassis() {
    let dialogRef = this.dialog.open(SellChassisComponent, {
      width: '600px',
      data: { teamChassisId: this.chassis?.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(teamChassisSell({ teamId: result }));
      }
    });
  }

  private loadTeamChassisDetails(teamId: string) {
    this.store.dispatch(teamChassisGet({ teamId: teamId }));
  }

  ngOnInit(): void {
    if (this.teamId) {
      this.loadTeamChassisDetails(this.teamId);
    }
    this.teamChassisSubscription = this.store
      .select((str) => str.teamChassisState)
      .subscribe((val) => {
        if (val) {
          this.isLoading = val.isLoading;
          this.errorMessage = val.errorMessage;
          this.chassis = val.chassis;
        }
      });
  }
  ngOnDestroy(): void {
    if (this.teamChassisSubscription) {
      this.teamChassisSubscription.unsubscribe();
    }
  }
}
