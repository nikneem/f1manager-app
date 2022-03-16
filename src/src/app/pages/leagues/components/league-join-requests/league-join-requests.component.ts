import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import {
  leagueAcceptRequest,
  leagueDeclineRequest,
  leagueGetRequests,
} from '@state/league/league-actions';
import { LeagueJoinRequestDto } from '@state/league/league-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-league-join-requests',
  templateUrl: './league-join-requests.component.html',
  styleUrls: ['./league-join-requests.component.scss'],
})
export class LeagueJoinRequestsComponent implements OnInit, OnDestroy {
  private selectedLeagueSubscription?: Subscription;
  private joinRequestsSubscription?: Subscription;
  private leagueId?: string;

  public isOwner: boolean = false;
  public requests: Array<LeagueJoinRequestDto> | undefined;
  displayedColumns: string[] = [
    'teamName',
    'createdOn',
    'expiresOn',
    'actions',
  ];
  constructor(private store: Store<AppState>) {}

  acceptRequest(request: LeagueJoinRequestDto) {
    if (this.leagueId && request.teamId) {
      this.store.dispatch(
        leagueAcceptRequest({ leagueId: this.leagueId, teamId: request.teamId })
      );
    }
  }
  declineRequest(request: LeagueJoinRequestDto) {
    if (this.leagueId && request.teamId) {
      this.store.dispatch(
        leagueDeclineRequest({
          leagueId: this.leagueId,
          teamId: request.teamId,
        })
      );
    }
  }

  ngOnInit(): void {
    this.selectedLeagueSubscription = this.store
      .select((str) => str.leaguesState.league)
      .subscribe((val) => {
        if (val?.isMaintainer && val?.id && this.leagueId !== val.id) {
          this.isOwner = val.isMaintainer;
          this.leagueId = val.id;
          this.store.dispatch(leagueGetRequests({ leagueId: val.id }));
        }
      });
    this.joinRequestsSubscription = this.store
      .select((str) => str.leaguesState.leagueRequests)
      .subscribe((val) => {
        this.requests = val;
      });
  }
  ngOnDestroy(): void {
    if (this.selectedLeagueSubscription) {
      this.selectedLeagueSubscription.unsubscribe();
    }
    if (this.joinRequestsSubscription) {
      this.joinRequestsSubscription.unsubscribe();
    }
  }
}
