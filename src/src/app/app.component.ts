import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '@state/app.state';
import { userRefresh } from '@state/user/user-actions';
import { RefreshTokenDto } from '@state/user/user-models';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'f1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'F1Manager';

  private refreshTokenSubscription?: Subscription;
  public isLoggedinSubscription?: Subscription;
  public loginSubscription?: Subscription;
  public isLoggedIn: boolean = false;
  public refreshed: boolean = false;

  constructor(
    private store: Store<AppState>,
    private translate: TranslateService,
    private cookieService: CookieService
  ) {
    translate.addLangs(['en', 'nl']);
    const preferredLanguage = this.preferredLanguage();
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(preferredLanguage);
  }

  private preferredLanguage(): string {
    const languageSetting = localStorage.getItem('language');
    if (languageSetting) {
      const languageIndex = this.translate.langs.indexOf(languageSetting);
      if (languageIndex >= 0) {
        return languageSetting;
      }
    }

    let browserLanguage = this.translate.langs[0];
    window.navigator.languages.some((val) => {
      const languageIndex = this.translate.langs.indexOf(val);
      if (languageIndex >= 0) {
        browserLanguage = val;
        return true;
      }
      return false;
    });

    return browserLanguage;
  }

  ngOnInit(): void {
    this.isLoggedinSubscription = this.store
      .select((str) => str.playerState)
      .subscribe((state) => {
        this.isLoggedIn = state ? state.isLoggedOn : false;
      });
    this.store
      .select((str) => str.userState)
      .subscribe((val) => {
        if (!val.isLoggedOn && !this.refreshed) {
          let previousToken = this.cookieService.get('f1mgr-refresh-token');
          if (previousToken) {
            this.refreshed = true;
            this.store.dispatch(
              userRefresh({
                token: new RefreshTokenDto({ token: previousToken }),
              })
            );
          }
        }
      });
    this.refreshTokenSubscription = this.store
      .select((str) => str.userState.refreshToken)
      .subscribe((val) => {
        if (val) {
          let expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 30);
          this.cookieService.set(
            'f1mgr-refresh-token',
            val,
            expirationDate,
            undefined,
            window.location.hostname,
            false,
            'Strict'
          );

          setTimeout(() => {
            this.store.dispatch(
              userRefresh({
                token: new RefreshTokenDto({ token: val }),
              })
            );
          }, 6000000);
        }
      });
  }
  ngOnDestroy(): void {
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
    }
    if (this.isLoggedinSubscription) {
      this.isLoggedinSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
