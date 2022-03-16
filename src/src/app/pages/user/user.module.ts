import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ChangePasswordPageComponent, UserHeaderComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class UserModule {}
