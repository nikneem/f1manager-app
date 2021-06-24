import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginRequestDto,
  LoginResultDto,
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
}
