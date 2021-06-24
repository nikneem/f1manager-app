import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ServerDownComponent } from './server-down/server-down.component';

const routes: Routes = [
  { path: 'main', children: [{ path: '', component: MainPageComponent }] },
  {
    path: 'server-down',
    children: [{ path: '', component: ServerDownComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
