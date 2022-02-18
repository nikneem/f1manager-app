import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import {
  leagueGetMembers,
  leagueGetMembersSuccess,
} from '@state/league/league-actions';
import { LeagueMemberDto } from '@state/league/league-models';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { TeamFilterDto } from '@state/team/team-models';

@Component({
  selector: 'f1-league-members-list',
  templateUrl: './league-members-list.component.html',
  styleUrls: ['./league-members-list.component.scss'],
})
export class LeagueMembersListComponent implements OnInit, OnDestroy {
  private leagueMembersSubscription?: Subscription;
  private leagueSubscription?: Subscription;

  public members?: Array<LeagueMemberDto>;
  private leagueId: string | undefined;
  displayedColumns: string[] = ['position', 'name', 'points', 'money'];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.leagueMembersSubscription = this.store
      .select((str) => str.leaguesState.league?.members)
      .subscribe((val) => {
        let enrich = !this.members || this.members.length !== val?.length;
        this.members = val;
        if (enrich) {
          let filter = {
            teamIds: _.map(this.members, 'teamId'),
          } as TeamFilterDto;
          this.store.dispatch(leagueGetMembers({ filter: filter }));
        }
      });

    this.leagueSubscription = this.store
      .select((str) => str.leaguesState.league)
      .subscribe((val) => {
        if (val?.id && val?.id !== this.leagueId) {
          this.leagueId = val.id;
        }
      });
  }
  ngOnDestroy(): void {
    if (this.leagueMembersSubscription) {
      this.leagueMembersSubscription.unsubscribe();
    }

    if (this.leagueSubscription) {
      this.leagueSubscription.unsubscribe();
    }
  }
}
