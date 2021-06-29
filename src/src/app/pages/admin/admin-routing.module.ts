import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from 'src/app/shared/admin-auth.guard';
import { AdminTemplateComponent } from 'src/app/template/admin-template/admin-template.component';
import { ChassisListPageComponent } from './chassis/pages/chassis-list-page/chassis-list-page.component';
import { DriverListPageComponent } from './drivers/pages/driver-list-page/driver-list-page.component';
import { EnginesListPageComponent } from './engines/pages/engines-list-page/engines-list-page.component';
import { RaceResultsPageComponent } from './results/pages/race-results-page/race-results-page.component';
import { TeamListPageComponent } from './teams/pages/team-list-page/team-list-page.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminTemplateComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: '', redirectTo: 'teams', pathMatch: 'full' },
      { path: 'teams', component: TeamListPageComponent },
      { path: 'drivers', component: DriverListPageComponent },
      { path: 'engines', component: EnginesListPageComponent },
      { path: 'chassis', component: ChassisListPageComponent },
      { path: 'results', component: RaceResultsPageComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
