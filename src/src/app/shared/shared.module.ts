import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ComponentsModule } from '@components/components.module';
import { PrimengModule } from './primeng/primeng.module';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, PrimengModule, ComponentsModule],
  exports: [MaterialModule, ComponentsModule, PrimengModule, TranslateModule],
  providers: [MessageService],
})
export class SharedModule { }
