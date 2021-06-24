import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamFirstDriverComponent } from './components/team-first-driver/team-first-driver.component';
import { TeamSecondDriverComponent } from './components/team-second-driver/team-second-driver.component';
import { TeamEngineComponent } from './components/team-engine/team-engine.component';
import { TeamChassisComponent } from './components/team-chassis/team-chassis.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { TeamCreateDialogComponent } from './dialogs/team-create-dialog/team-create-dialog.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';

@NgModule({
  declarations: [
    TeamCreateDialogComponent,
    TeamFirstDriverComponent,
    TeamSecondDriverComponent,
    TeamEngineComponent,
    TeamChassisComponent,
    DashboardPageComponent,
    TeamInfoComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
