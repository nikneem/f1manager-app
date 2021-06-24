import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EngineDto } from '@state/engine/engine-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EngineService {
  constructor(private http: HttpClient) {}

  public getActive(): Observable<Array<EngineDto>> {
    var url = `${environment.backendUrl}/api/engines`;
    return this.http.get<Array<EngineDto>>(url);
  }
}
