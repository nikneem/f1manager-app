import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EngineDto, EnginesListFilterDto } from '@state/engine/engine-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EngineService {
  constructor(private http: HttpClient) {}

  public list(filter?: EnginesListFilterDto): Observable<Array<EngineDto>> {
    let url = `${environment.backendUrl}/api/engines`;
    if (filter?.name) {
      url = `${url}?name=${filter.name}`;
    }
    if (filter?.deleted) {
      let splitChar = url.indexOf('?') >= 0 ? '&' : '?';
      url = `${url}${splitChar}deleted=${filter.deleted}`;
    }

    return this.http.get<Array<EngineDto>>(url);
  }
  public create(dto: EngineDto): Observable<EngineDto> {
    var url = `${environment.backendUrl}/api/engines`;
    return this.http.post<EngineDto>(url, dto);
  }
  public update(id: string, dto: EngineDto): Observable<EngineDto> {
    var url = `${environment.backendUrl}/api/engines/${id}`;
    return this.http.put<EngineDto>(url, dto);
  }
  public delete(id: string): Observable<EngineDto> {
    var url = `${environment.backendUrl}/api/engines/${id}`;
    return this.http.delete<EngineDto>(url);
  }
  public undelete(id: string): Observable<EngineDto> {
    var url = `${environment.backendUrl}/api/engines/${id}/undelete`;
    return this.http.delete<EngineDto>(url);
  }

  public getActive(): Observable<Array<EngineDto>> {
    var url = `${environment.backendUrl}/api/engines/active`;
    return this.http.get<Array<EngineDto>>(url);
  }
}
