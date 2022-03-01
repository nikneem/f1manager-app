import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { LeagueDto } from '@state/league/league-models';
import { debounceTime, Subscription } from 'rxjs';
import * as _ from 'lodash';
import { TeamFilterDto, TeamListItemDto } from '@state/team/team-models';
import { FormControl, FormGroup } from '@angular/forms';
import { TeamsService } from '@services/teams.service';

@Component({
  selector: 'f1-league-invite-dialog',
  templateUrl: './league-invite-dialog.component.html',
  styleUrls: ['./league-invite-dialog.component.scss'],
})
export class LeagueInviteDialogComponent implements OnInit {
  private leagueSubscription?: Subscription;
  private league?: LeagueDto;
  private teamIds?: Array<string>;
  private filter?: TeamFilterDto;
  public teamsForm: FormGroup;
  public teams: Array<TeamListItemDto>;
  displayedColumns: string[] = ['name', 'points'];
  constructor(
    private store: Store<AppState>,
    private teamsService: TeamsService
  ) {
    this.teams = new Array<TeamListItemDto>();
    this.teamsForm = new FormGroup({
      name: new FormControl(''),
    });
    this.teamsForm.controls['name'].valueChanges
      .pipe(debounceTime(380))
      .subscribe((value) => {
        if (value?.length > 2 && this.filter) {
          this.filter.name = value;
          this.searchTeam();
        } else {
          this.teams = new Array<TeamListItemDto>();
        }
      });
  }

  private searchTeam() {
    if (this.filter) {
      this.teamsService.search(this.filter).subscribe((val) => {
        this.teams = val.entities;
      });
    }
  }

  ngOnInit(): void {
    this.leagueSubscription = this.store
      .select((str) => str.leaguesState.league)
      .subscribe((val) => {
        this.league = val;
        if (val) {
          this.filter = {
            excludeTeamIds: _.map(val.members, 'teamId'),
          } as TeamFilterDto;
        }
      });
  }
  ngOnDestroy(): void {
    if (this.leagueSubscription) {
      this.leagueSubscription.unsubscribe();
    }
  }
}
