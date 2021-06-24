import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BaseTeamDto,
  BaseTeamListFilterDto,
} from '@state/base-team/base-team-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseTeamService {
  constructor(private http: HttpClient) {}

  public list(filter?: BaseTeamListFilterDto): Observable<Array<BaseTeamDto>> {
    let url = `${environment.backendUrl}/api/baseteams`;
    if (filter?.name) {
      url = `${url}?name=${filter.name}`;
    }
    return this.http.get<Array<BaseTeamDto>>(url);
  }
  public create(dto: BaseTeamDto): Observable<BaseTeamDto> {
    var url = `${environment.backendUrl}/api/baseteams`;
    return this.http.post<BaseTeamDto>(url, dto);
  }
  public update(id: string, dto: BaseTeamDto): Observable<BaseTeamDto> {
    var url = `${environment.backendUrl}/api/baseteams/${id}`;
    return this.http.put<BaseTeamDto>(url, dto);
  }
  public delete(id: string): Observable<BaseTeamDto> {
    var url = `${environment.backendUrl}/api/baseteams/${id}`;
    return this.http.delete<BaseTeamDto>(url);
  }
}
