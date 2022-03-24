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
    let url = `${environment.backendUrl}/api/actualteams`;
    if (filter?.name) {
      url = `${url}?name=${filter.name}`;
    }
    if (filter?.deleted) {
      let splitChar = url.indexOf('?') >= 0 ? '&' : '?';
      url = `${url}${splitChar}deleted=${filter.deleted}`;
    }
    return this.http.get<Array<BaseTeamDto>>(url);
  }
  public create(dto: BaseTeamDto): Observable<BaseTeamDto> {
    var url = `${environment.backendUrl}/api/actualteams`;
    return this.http.post<BaseTeamDto>(url, dto);
  }
  public update(id: string, dto: BaseTeamDto): Observable<BaseTeamDto> {
    var url = `${environment.backendUrl}/api/actualteams/${id}`;
    return this.http.put<BaseTeamDto>(url, dto);
  }
  public delete(id: string): Observable<BaseTeamDto> {
    var url = `${environment.backendUrl}/api/actualteams/${id}`;
    return this.http.delete<BaseTeamDto>(url);
  }
  public undelete(id: string): Observable<BaseTeamDto> {
    var url = `${environment.backendUrl}/api/actualteams/${id}/undelete`;
    return this.http.delete<BaseTeamDto>(url);
  }
}
