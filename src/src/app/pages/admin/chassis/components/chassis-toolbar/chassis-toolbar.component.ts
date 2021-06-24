import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { chassisFilterUpdate } from '@state/chassis/chassis-actions';
import { ChassisListFilterDto } from '@state/chassis/chassis-models';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'f1-chassis-toolbar',
  templateUrl: './chassis-toolbar.component.html',
  styleUrls: ['./chassis-toolbar.component.scss']
})
export class ChassisToolbarComponent implements OnInit, OnDestroy {
  @Output() createChassis = new EventEmitter();

  private filterSubscription?: Subscription;

  private filter?: ChassisListFilterDto;
  public filterForm?: FormGroup;

  constructor(private store: Store<AppState>) {}

  createChassisButtonClicked() {
    this.createChassis.emit();
  }

  initializeForm() {
    this.filterForm = new FormGroup({
      name: new FormControl(this.filter?.name),
      deleted: new FormControl(this.filter?.deleted)
    });

    this.filterForm.valueChanges.pipe(debounceTime(380)).subscribe((value) => {
      const filter = new ChassisListFilterDto(value);
      this.store.dispatch(chassisFilterUpdate({ payload: filter }));
    });
  }

  ngOnInit(): void {
    this.filterSubscription = this.store
      .select((str) => str.chassisState.filter)
      .subscribe((val) => {
        this.filter = val;
        this.initializeForm();
      })
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }
}
