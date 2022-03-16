import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServerDownComponent } from './server-down/server-down.component';
import { ComponentsModule } from '@components/components.module';
import { PasswordverifyPageComponent } from './passwordverify-page/passwordverify-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainPageComponent,
    ServerDownComponent,
    PasswordverifyPageComponent,
  ],
  imports: [CommonModule, SharedModule, MainRoutingModule, ReactiveFormsModule],
})
export class MainModule {}
