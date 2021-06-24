import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  private isLoggedIn: boolean = false;
  private isAdministrator: boolean = false;

  constructor(private store: Store<AppState>) {
    this.store
      .select((str) => str.userState)
      .subscribe((val) => {
        this.isLoggedIn = val.isLoggedOn;
        this.isAdministrator = val.isAdministrator;
      });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.isLoggedIn || !this.isAdministrator) {
      console.log('User is not authorized for this route');
    }
    return this.isLoggedIn;
  }
}
