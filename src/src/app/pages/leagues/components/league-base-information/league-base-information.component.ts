import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { leagueGet } from '@state/league/league-actions';
import { LeagueDto } from '@state/league/league-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-league-base-information',
  templateUrl: './league-base-information.component.html',
  styleUrls: ['./league-base-information.component.scss'],
})
export class LeagueBaseInformationComponent implements OnInit, OnDestroy {
  private selectedLeagueSubscription?: Subscription;
  public league: LeagueDto | undefined;
  public leagueForm: FormGroup | undefined;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  private createForm() {
    this.leagueForm = undefined;
    if (this.league) {
      this.leagueForm = new FormGroup({
        name: new FormControl(
          { value: this.league.name, disabled: !this.league.isMaintainer },
          [Validators.required, Validators.min(5), Validators.max(100)]
        ),
        createdOn: new FormControl({
          value: this.league.createdOn,
          disabled: true,
        }),
      });
    }
  }

  ngOnInit(): void {
    this.selectedLeagueSubscription = this.store
      .select((str) => str.leaguesState.league)
      .subscribe((val) => {
        this.league = val;
        this.createForm();
      });
  }
  ngOnDestroy(): void {
    if (this.selectedLeagueSubscription) {
      this.selectedLeagueSubscription.unsubscribe();
    }
  }
}
