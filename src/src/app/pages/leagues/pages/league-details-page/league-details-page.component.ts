import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { leagueGet } from '@state/league/league-actions';
import { LeagueDto } from '@state/league/league-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-league-details-page',
  templateUrl: './league-details-page.component.html',
  styleUrls: ['./league-details-page.component.scss'],
})
export class LeagueDetailsPageComponent implements OnInit, OnDestroy {
  private isLoadingSubscription?: Subscription;

  private leagueId: string | null = null;
  public isLoading: boolean = false;
  public league: LeagueDto | null = null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.leagueId = this.route.snapshot.paramMap.get('id');
    if (this.leagueId) {
      this.store.dispatch(leagueGet({ leagueId: this.leagueId }));
    }

    this.isLoadingSubscription = this.store
      .select((str) => str.leaguesState.isLoading)
      .subscribe((val) => (this.isLoading = val));
  }
  ngOnDestroy(): void {
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }
}
