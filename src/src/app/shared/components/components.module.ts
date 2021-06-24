import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { SelectEngineComponent } from './select-engine/select-engine.component';
import { MaterialModule } from '../material/material.module';
import { SellEngineComponent } from './sell-engine/sell-engine.component';
import { SelectChassisComponent } from './select-chassis/select-chassis.component';
import { SellChassisComponent } from './sell-chassis/sell-chassis.component';
import { SelectDriverComponent } from './select-driver/select-driver.component';
import { SellDriverComponent } from './sell-driver/sell-driver.component';
import { NotificationButtonComponent } from './notification-button/notification-button.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { LanguageButtonComponent } from './language-button/language-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { AdminToolbarComponent } from './admin-toolbar/admin-toolbar.component';
import { RouterModule } from '@angular/router';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { DragndropDirective } from './dragndrop.directive';
import { UserRegistrationDialogComponent } from './user-registration-dialog/user-registration-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationButtonComponent } from './user-registration-button/user-registration-button.component';
import { UserLoginDialogComponent } from './user-login-dialog/user-login-dialog.component';
import { UserLoginButtonComponent } from './user-login-button/user-login-button.component';

@NgModule({
  declarations: [
    LoadingComponent,
    SelectEngineComponent,
    SellEngineComponent,
    SelectChassisComponent,
    SellChassisComponent,
    SelectDriverComponent,
    SellDriverComponent,
    NotificationButtonComponent,
    NotificationListComponent,
    LanguageButtonComponent,
    ConfirmationDialogComponent,
    AdminToolbarComponent,
    EmptyStateComponent,
    UploadImageComponent,
    DragndropDirective,
    UserRegistrationDialogComponent,
    UserRegistrationButtonComponent,
    UserLoginDialogComponent,
    UserLoginButtonComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoadingComponent,
    LanguageButtonComponent,
    NotificationButtonComponent,
    AdminToolbarComponent,
    EmptyStateComponent,
    UploadImageComponent,
    UserRegistrationButtonComponent,
    UserLoginButtonComponent,
  ],
})
export class ComponentsModule {}
