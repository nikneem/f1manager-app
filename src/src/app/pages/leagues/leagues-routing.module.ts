import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from 'src/app/shared/user-auth.guard';
import { AdminTemplateComponent } from 'src/app/template/admin-template/admin-template.component';
import { LeagueDetailsPageComponent } from './pages/league-details-page/league-details-page.component';
import { LeagueOverviewPageComponent } from './pages/league-overview-page/league-overview-page.component';

const routes: Routes = [
  {
    path: 'leagues',
    component: AdminTemplateComponent,
    canActivate: [UserAuthGuard],
    children: [
      { path: 'overview', component: LeagueOverviewPageComponent },
      { path: 'details/:id', component: LeagueDetailsPageComponent },
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaguesRoutingModule {}
