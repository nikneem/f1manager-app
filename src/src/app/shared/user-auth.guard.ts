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
export class UserAuthGuard implements CanActivate {
  private isLoggedIn: boolean = false;

  constructor(private store: Store<AppState>) {
    this.store
      .select((str) => str.userState.isLoggedOn)
      .subscribe((val) => {
        this.isLoggedIn = val;
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
    if (!this.isLoggedIn) {
      console.log('User is not authorized for this route');
    }
    return this.isLoggedIn;
  }
}
