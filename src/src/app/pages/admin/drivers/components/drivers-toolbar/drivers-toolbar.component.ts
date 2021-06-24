import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { driverFilterUpdate } from '@state/driver/driver-actions';
import { DriverListFilterDto } from '@state/driver/driver-models';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'f1-drivers-toolbar',
  templateUrl: './drivers-toolbar.component.html',
  styleUrls: ['./drivers-toolbar.component.scss'],
})
export class DriversToolbarComponent implements OnInit, OnDestroy {
  @Output() createDriver = new EventEmitter();

  private filterSubscription?: Subscription;

  private filter?: DriverListFilterDto;
  public filterForm?: FormGroup;

  constructor(private store: Store<AppState>) {}

  createDriverButtonClicked() {
    this.createDriver.emit();
  }
  initializeForm() {
    this.filterForm = new FormGroup({
      name: new FormControl(this.filter?.name),
      deleted: new FormControl(this.filter?.deleted),
    });

    this.filterForm.valueChanges.pipe(debounceTime(380)).subscribe((value) => {
      const filter = new DriverListFilterDto(value);
      this.store.dispatch(driverFilterUpdate({ payload: filter }));
    });
  }

  ngOnInit(): void {
    this.filterSubscription = this.store
      .select((str) => str.driverState.filter)
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
