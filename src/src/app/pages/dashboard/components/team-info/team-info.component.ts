import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { TeamsService } from '@services/teams.service';
import { AppState } from '@state/app.state';
import { teamUpdate } from '@state/team/team-actions';
import { TeamDetailsDto, TeamUpdateDto } from '@state/team/team-models';
import { of, Subscription } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'f1-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss'],
})
export class TeamInfoComponent implements OnInit, OnDestroy {
  public dto?: TeamDetailsDto;

  private teamDetailsSubscription?: Subscription;
  public teamForm?: FormGroup;

  constructor(
    private store: Store<AppState>,
    private teamsService: TeamsService
  ) {}

  public createTeamForm() {
    if (this.dto && this.dto.isTeamOwner) {
      this.teamForm = new FormGroup({
        id: new FormControl(this.dto?.id),
        name: new FormControl(
          this.dto?.name,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
          [teamNameValidator(this.teamsService)]
        ),
        isPublic: new FormControl(this.dto?.isPublic),
      });

      this.teamForm.valueChanges
        .pipe(
          map((val) => val),
          debounceTime(300)
        )
        .subscribe((val) => {
          if (this.teamForm?.valid) {
            const dto = new TeamUpdateDto(this.teamForm?.value);
            this.store.dispatch(teamUpdate({ payload: dto }));
          }
        });
    }
  }

  ngOnInit(): void {
    this.teamDetailsSubscription = this.store
      .select((str) => str.teamState.model)
      .subscribe((val) => {
        this.dto = val;
        this.createTeamForm();
      });
  }
  ngOnDestroy(): void {
    if (this.teamDetailsSubscription) {
      this.teamDetailsSubscription.unsubscribe();
    }
  }
}

export function teamNameValidator(
  teamsService: TeamsService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return teamsService
      .checkName(new TeamUpdateDto({ name: control.value }))
      .pipe(
        map(() => null),
        catchError(() => of({ teamNameUnique: true }))
      );
  };
}
