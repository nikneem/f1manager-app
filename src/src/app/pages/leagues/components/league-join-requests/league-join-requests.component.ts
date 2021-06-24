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
  displayedColumns: string[] = ['name', 'requestedOn', 'actions'];
  constructor(private store: Store<AppState>) {}

  acceptRequest(request: LeagueJoinRequestDto) {
    if (this.leagueId && request.id) {
      this.store.dispatch(
        leagueAcceptRequest({ leagueId: this.leagueId, requestId: request.id })
      );
    }
  }
  declineRequest(request: LeagueJoinRequestDto) {
    if (this.leagueId && request.id) {
      this.store.dispatch(
        leagueDeclineRequest({ leagueId: this.leagueId, requestId: request.id })
      );
    }
  }

  ngOnInit(): void {
    this.selectedLeagueSubscription = this.store
      .select((str) => str.leaguesState.league)
      .subscribe((val) => {
        this.leagueId = undefined;
        this.isOwner = false;
        if (val?.isOwner && val?.id) {
          this.isOwner = val.isOwner;
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
