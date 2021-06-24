import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DriversToolbarComponent } from './drivers/components/drivers-toolbar/drivers-toolbar.component';
import { DriverDetailsDialogComponent } from './drivers/dialogs/driver-details-dialog/driver-details-dialog.component';
import { DriverListPageComponent } from './drivers/pages/driver-list-page/driver-list-page.component';
import { TeamListPageComponent } from './teams/pages/team-list-page/team-list-page.component';
import { TeamsToolbarComponent } from './teams/components/teams-toolbar/teams-toolbar.component';
import { EffectsModule } from '@ngrx/effects';
import { BaseTeamEffects } from '@state/base-team/base-team-effects';
import { BaseTeamDetailsDialogComponent } from './teams/dialogs/base-team-details-dialog/base-team-details-dialog.component';
import { ChassisToolbarComponent } from './chassis/components/chassis-toolbar/chassis-toolbar.component';
import { ChassisListPageComponent } from './chassis/pages/chassis-list-page/chassis-list-page.component';
import { ChassisDetailsDialogComponent } from './chassis/dialogs/chassis-details-dialog/chassis-details-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { RaceResultsPageComponent } from './results/pages/race-results-page/race-results-page.component';
import { RaceResultsToolbarComponent } from './results/components/race-results-toolbar/race-results-toolbar.component';

@NgModule({
  declarations: [
    DriverListPageComponent,
    DriverDetailsDialogComponent,
    DriversToolbarComponent,
    TeamListPageComponent,
    TeamsToolbarComponent,
    BaseTeamDetailsDialogComponent,
    ChassisToolbarComponent,
    ChassisListPageComponent,
    ChassisDetailsDialogComponent,
    RaceResultsPageComponent,
    RaceResultsToolbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([BaseTeamEffects]),
    TranslateModule
  ],
  exports: [],
})
export class AdminModule {}
