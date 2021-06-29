import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { chassisFilterUpdate } from '@state/chassis/chassis-actions';
import { ChassisListFilterDto } from '@state/chassis/chassis-models';
import { EnginesListFilterDto } from '@state/engine/engine-models';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'f1-engines-toolbar',
  templateUrl: './engines-toolbar.component.html',
  styleUrls: ['./engines-toolbar.component.scss'],
})
export class EnginesToolbarComponent implements OnInit, OnDestroy {
  @Output() createEngine = new EventEmitter();

  private filterSubscription?: Subscription;

  private filter?: EnginesListFilterDto;
  public filterForm?: FormGroup;

  constructor(private store: Store<AppState>) {}

  createEngineButtonClicked() {
    this.createEngine.emit();
  }

  initializeForm() {
    this.filterForm = new FormGroup({
      name: new FormControl(this.filter?.name),
      deleted: new FormControl(this.filter?.deleted),
    });

    this.filterForm.valueChanges.pipe(debounceTime(380)).subscribe((value) => {
      const filter = new EnginesListFilterDto(value);
      this.store.dispatch(chassisFilterUpdate({ payload: filter }));
    });
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
