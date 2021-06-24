import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from 'src/app/template/admin-template/admin-template.component';
import { RulesPageComponent } from './rules-page/rules-page.component';

const routes: Routes = [
  {
    path: 'rules',
    component: AdminTemplateComponent,
    children: [{ path: '', component: RulesPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RulesRoutingModule {}
