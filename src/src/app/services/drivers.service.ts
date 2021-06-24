import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DriverDto, DriverListFilterDto } from '@state/driver/driver-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DriversService {
  constructor(private http: HttpClient) {}

  public list(filter?: DriverListFilterDto): Observable<Array<DriverDto>> {
    let url = `${environment.backendUrl}/api/drivers`;
    if (filter?.name) {
      url = `${url}?name=${filter.name}`;
    }
    if (filter?.deleted) {
      let splitChar = url.indexOf('?') >= 0 ? '&' : '?';
      url = `${url}${splitChar}deleted=${filter.deleted}`;
    }

    return this.http.get<Array<DriverDto>>(url);
  }
  public create(dto: DriverDto): Observable<DriverDto> {
    var url = `${environment.backendUrl}/api/drivers`;
    return this.http.post<DriverDto>(url, dto);
  }
  public update(id: string, dto: DriverDto): Observable<DriverDto> {
    var url = `${environment.backendUrl}/api/drivers/${id}`;
    return this.http.put<DriverDto>(url, dto);
  }
  public delete(id: string): Observable<DriverDto> {
    var url = `${environment.backendUrl}/api/drivers/${id}`;
    return this.http.delete<DriverDto>(url);
  }
  public undelete(id: string): Observable<DriverDto> {
    var url = `${environment.backendUrl}/api/drivers/${id}/undelete`;
    return this.http.delete<DriverDto>(url);
  }

  public getActive(): Observable<Array<DriverDto>> {
    var url = `${environment.backendUrl}/api/drivers/active`;
    return this.http.get<Array<DriverDto>>(url);
  }
}
