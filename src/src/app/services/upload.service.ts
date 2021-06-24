import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class SasTokenDto {
  public storageAccountUrl?: string;
  public sasToken?: string;
  public blobName?: string;
  public constainerName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  aquireSasToken(entityType: string): Observable<SasTokenDto> {
    const url = `${environment.backendUrl}/api/upload?entityType=${entityType}`;
    return this.http.get<SasTokenDto>(url);
  }

}
