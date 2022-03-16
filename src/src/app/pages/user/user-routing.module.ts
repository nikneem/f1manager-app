import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from 'src/app/shared/admin-auth.guard';
import { AdminTemplateComponent } from 'src/app/template/admin-template/admin-template.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';

const routes: Routes = [
  {
    path: 'user',
    component: AdminTemplateComponent,
    canActivate: [AdminAuthGuard],
    children: [
      { path: 'changepassword', component: ChangePasswordPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
