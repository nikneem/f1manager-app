import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChassisDto, ChassisListFilterDto } from '@state/chassis/chassis-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChassisService {
  constructor(private http: HttpClient) {}

  public list(filter?: ChassisListFilterDto): Observable<Array<ChassisDto>> {
    let url = `${environment.backendUrl}/api/chassis`;
    if (filter?.name) {
      url = `${url}?name=${filter.name}`;
    }
    if (filter?.deleted) {
      let splitChar = url.indexOf('?') >= 0 ? '&' : '?';
      url = `${url}${splitChar}deleted=${filter.deleted}`;
    }

    return this.http.get<Array<ChassisDto>>(url);
  }

  public create(dto: ChassisDto): Observable<ChassisDto> {
    var url = `${environment.backendUrl}/api/chassis`;
    return this.http.post<ChassisDto>(url, dto);
  }

  public update(id: string, dto: ChassisDto): Observable<ChassisDto> {
    var url = `${environment.backendUrl}/api/chassis/${id}`;
    return this.http.put<ChassisDto>(url, dto);
  }

  public delete(id: string): Observable<ChassisDto> {
    var url = `${environment.backendUrl}/api/chassis/${id}`;
    return this.http.delete<ChassisDto>(url);
  }

  public undelete(id: string): Observable<ChassisDto> {
    var url = `${environment.backendUrl}/api/chassis/${id}/undelete`;
    return this.http.delete<ChassisDto>(url);
  }

  public getActive(): Observable<Array<ChassisDto>> {
    var url = `${environment.backendUrl}/api/chassis`;
    return this.http.get<Array<ChassisDto>>(url);
  }
}
