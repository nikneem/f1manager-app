import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from 'src/app/template/admin-template/admin-template.component';
import { RulesOverviewPageComponent } from './pages/rules-overview-page/rules-overview-page.component';

const routes: Routes = [
  {
    path: 'rules',
    component: AdminTemplateComponent,
    children: [{ path: '', component: RulesOverviewPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RulesRoutingModule {}
