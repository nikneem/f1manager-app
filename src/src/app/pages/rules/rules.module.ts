import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RulesRoutingModule } from './rules-routing.module';
import { MarkdownModule } from 'ngx-markdown';
import { RulesOverviewPageComponent } from './pages/rules-overview-page/rules-overview-page.component';
import { RulesToolbarComponent } from './components/rules-toolbar/rules-toolbar.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RulesOverviewPageComponent, RulesToolbarComponent],
  imports: [
    CommonModule,
    RulesRoutingModule,
    MarkdownModule.forChild(),
    SharedModule,
  ],
})
export class RulesModule {}
