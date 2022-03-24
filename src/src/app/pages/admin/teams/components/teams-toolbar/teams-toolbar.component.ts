import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { baseTeamFilterUpdate } from '@state/base-team/base-team-actions';
import { BaseTeamListFilterDto } from '@state/base-team/base-team-models';
import { debounceTime, Subscription } from 'rxjs';
import { BaseTeamDetailsDialogComponent } from '../../dialogs/base-team-details-dialog/base-team-details-dialog.component';

@Component({
  selector: 'f1-teams-toolbar',
  templateUrl: './teams-toolbar.component.html',
  styleUrls: ['./teams-toolbar.component.scss'],
})
export class TeamsToolbarComponent implements OnInit {
  @Output() createTeam = new EventEmitter();

  private filterSubscription?: Subscription;

  private filter?: BaseTeamListFilterDto;
  public filterForm?: FormGroup;

  constructor(private store: Store<AppState>) {}

  initializeForm() {
    this.filterForm = new FormGroup({
      name: new FormControl(this.filter?.name),
      deleted: new FormControl(this.filter?.deleted),
    });

    this.filterForm.valueChanges.pipe(debounceTime(380)).subscribe((value) => {
      const filter = new BaseTeamListFilterDto(value);
      this.store.dispatch(baseTeamFilterUpdate({ payload: filter }));
    });
  }

  createBaseTeam() {
    this.createTeam.emit();
    // this.dialog.open(BaseTeamDetailsDialogComponent, {
    //   width: '80%',
    // });
  }
  ngOnInit(): void {
    this.filterSubscription = this.store
      .select((str) => str.engineState.filter)
      .subscribe((val) => {
        this.filter = val;
        this.initializeForm();
      });
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
