import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplateComponent } from 'src/app/template/admin-template/admin-template.component';
import { CreditsPageComponent } from './credits-page/credits-page.component';

const routes: Routes = [
  {
    path: 'credits',
    component: AdminTemplateComponent,
    children: [{ path: '', component: CreditsPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditsRoutingModule {}
