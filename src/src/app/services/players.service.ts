import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerInformationDto } from '@state/player/player-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private http: HttpClient) {}

  public resolve(
    dto: PlayerInformationDto | null
  ): Observable<PlayerInformationDto> {
    var url = `${environment.backendUrl}/api/players`;
    return this.http.post<PlayerInformationDto>(url, dto);
  }
}
