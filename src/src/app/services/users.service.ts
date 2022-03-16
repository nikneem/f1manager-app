import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ChangePasswordDto,
  LoginRequestDto,
  LoginResultDto,
  PasswordResetDto,
  PasswordResetVerificationDto,
  UserRegistrationDto,
} from '@state/user/user-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public register(dto: UserRegistrationDto): Observable<LoginResultDto> {
    var url = `${environment.backendUrl}/api/users`;
    return this.http.post<LoginResultDto>(url, dto);
  }

  public resetPassword(
    dto: PasswordResetDto
  ): Observable<HttpResponse<boolean>> {
    var url = `${environment.backendUrl}/api/users/resetpwd`;
    return this.http.post<boolean>(url, dto, {
      observe: 'response',
    });
  }
  public resetPasswordConfirmation(
    dto: PasswordResetVerificationDto
  ): Observable<HttpResponse<boolean>> {
    var url = `${environment.backendUrl}/api/users/resetconfirm`;
    return this.http.post<boolean>(url, dto, {
      observe: 'response',
    });
  }
  public changePassword(
    dto: ChangePasswordDto
  ): Observable<HttpResponse<boolean>> {
    var url = `${environment.backendUrl}/api/users/changepassword`;
    return this.http.post<boolean>(url, dto, {
      observe: 'response',
    });
  }
}
