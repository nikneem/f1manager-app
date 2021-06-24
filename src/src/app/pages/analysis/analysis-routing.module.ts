import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from 'src/app/shared/user-auth.guard';
import { AdminTemplateComponent } from 'src/app/template/admin-template/admin-template.component';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';

const routes: Routes = [
  {
    path: 'analysis',
    component: AdminTemplateComponent,
    canActivate: [UserAuthGuard],
    children: [{ path: '', component: AnalysisPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnalysisRoutingModule {}
