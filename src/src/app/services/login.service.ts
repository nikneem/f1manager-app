import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginAttemptDto,
  LoginRequestDto,
  LoginResponseDto,
  LoginResultDto,
  RefreshTokenDto,
} from '@state/user/user-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public createAttempt(): Observable<LoginAttemptDto> {
    var url = `${environment.backendUrl}/api/login`;
    return this.http.get<LoginAttemptDto>(url);
  }
  public request(request: LoginRequestDto): Observable<LoginResultDto> {
    var url = `${environment.backendUrl}/api/login`;
    return this.http.post<LoginResultDto>(url, request);
  }
  public refresh(token: RefreshTokenDto): Observable<LoginResultDto> {
    var url = `${environment.backendUrl}/api/login/refresh`;
    return this.http.post<LoginResultDto>(url, token);
  }
}
