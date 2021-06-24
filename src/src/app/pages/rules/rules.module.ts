import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesRoutingModule } from './rules-routing.module';
import { RulesPageComponent } from './rules-page/rules-page.component';


@NgModule({
  declarations: [RulesPageComponent],
  imports: [
    CommonModule,
    RulesRoutingModule
  ]
})
export class RulesModule { }
