import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, concatMap, delay, retry, retryWhen } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store: Store<AppState>) {
    this.store
      .select((str) => str.userState.loginToken)
      .subscribe((token) => (this.jwtToken = token));
  }
  private jwtToken?: string;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let copiedRequest = request;

    if (
      this.jwtToken &&
      copiedRequest.url
        .toLocaleLowerCase()
        .startsWith(environment.backendUrl.toLocaleLowerCase())
    ) {
      copiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
      });
    }

    return next.handle(copiedRequest).pipe(
      retryWhen((error) =>
        error.pipe(
          concatMap((error, count) => {
            if (count <= 2 && (error.status === 503 || error.status === 0)) {
              return of(error);
            }
            return throwError(error);
          }),
          delay(300)
        )
      ),

      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          // Server down
          this.router.navigate(['/server-down']);
        }
        return throwError(error);
      })
    );
  }
}
