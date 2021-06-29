import { Input, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectEngineComponent } from '@components/select-engine/select-engine.component';
import { SellEngineComponent } from '@components/sell-engine/sell-engine.component';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import {
  teamEngineBuy,
  teamEngineSell,
  teamEngineGet,
} from '@state/team-engine/team-engine-actions';
import { TeamEngineDto } from '@state/team-engine/team-engine-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-team-engine',
  templateUrl: './team-engine.component.html',
  styleUrls: ['./team-engine.component.scss'],
})
export class TeamEngineComponent implements OnInit, OnDestroy {
  private teamEngineSubscription?: Subscription;

  @Input() public teamId?: string;

  public engine?: TeamEngineDto;
  public isLoading: boolean = true;
  public errorMessage?: string;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  public buyEngine() {
    let dialogRef = this.dialog.open(SelectEngineComponent, {
      width: '80%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(teamEngineBuy({ engineId: result }));
      }
    });
  }
  public sellEngine() {
    let dialogRef = this.dialog.open(SellEngineComponent, {
      width: '600px',
      data: { teamEngineId: this.engine?.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(teamEngineSell({ teamEngineId: result }));
      }
    });
  }

  private loadTeamEngineDetails(teamId: string) {
    this.store.dispatch(teamEngineGet({ teamId: teamId }));
  }

  ngOnInit(): void {
    if (this.teamId) {
      this.loadTeamEngineDetails(this.teamId);
    }
    this.teamEngineSubscription = this.store
      .select((str) => str.teamEngineState)
      .subscribe((val) => {
        if (val) {
          this.isLoading = val.isLoading;
          this.errorMessage = val.errorMessage;
          this.engine = val.engine;
        }
      });
  }
  ngOnDestroy(): void {
    if (this.teamEngineSubscription) {
      this.teamEngineSubscription.unsubscribe();
    }
  }
}
