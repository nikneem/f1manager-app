import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './pages/main/main.module';
import { TemplateModule } from './template/template.module';

/* NGRX / Redux */
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { INITIAL_APPSTATE, reducers } from '@state/app.state';
import { PlayerEffects } from '@state/player/player-effects';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AuthInterceptor } from './shared/AuthInterceptor';
import { DashboardModule } from '@pages/dashboard/dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamEffects } from '@state/team/team-effects';
import { RulesModule } from '@pages/rules/rules.module';
import { AnalysisModule } from '@pages/analysis/analysis.module';
import { CreditsModule } from '@pages/credits/credits.module';
import { EngineEffects } from '@state/engine/engine-effects';
import { TeamEngineEffects } from '@state/team-engine/team-engine-effects';
import { ChassisEffects } from '@state/chassis/chassis-effects';
import { TeamChassisEffects } from '@state/team-chassis/team-chassis-effects';
import { TeamDriverEffects } from '@state/team-driver/team-driver-effects';
import { DriverEffects } from '@state/driver/driver-effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LeaguesModule } from '@pages/leagues/leagues.module';
import { AdminModule } from '@pages/admin/admin.module';
import { UserEffects } from '@state/user/user-effects';
import { MarkdownModule } from 'ngx-markdown';
import { UserModule } from '@pages/user/user.module';

let metaReducers: any[] = [];
if (environment.production === false) {
  metaReducers = [storeFreeze];
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TemplateModule,
    MainModule,
    DashboardModule,
    RulesModule,
    LeaguesModule,
    AnalysisModule,
    CreditsModule,
    AdminModule,
    UserModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      initialState: INITIAL_APPSTATE,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 15 }),
    EffectsModule.forRoot([
      UserEffects,
      PlayerEffects,
      TeamEffects,
      TeamDriverEffects,
      TeamEngineEffects,
      TeamChassisEffects,
      DriverEffects,
      EngineEffects,
      ChassisEffects,
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
