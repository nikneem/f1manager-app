import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from 'src/app/shared/user-auth.guard';
import { AdminTemplateComponent } from 'src/app/template/admin-template/admin-template.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AdminTemplateComponent,
    canActivate: [UserAuthGuard],
    children: [{ path: '', component: DashboardPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
