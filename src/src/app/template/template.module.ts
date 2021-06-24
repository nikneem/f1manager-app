import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { RouterModule } from '@angular/router';
import { AdminTemplateHeaderComponent } from './admin-template-header/admin-template-header.component';
import { SharedModule } from '../shared/shared.module';
import { AdminTemplateNavigationComponent } from './admin-template-navigation/admin-template-navigation.component';
import { AdminTemplateNavigationToggleComponent } from './admin-template-navigation-toggle/admin-template-navigation-toggle.component';



@NgModule({
  declarations: [AdminTemplateComponent, AdminTemplateHeaderComponent, AdminTemplateNavigationComponent, AdminTemplateNavigationToggleComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class TemplateModule { }
