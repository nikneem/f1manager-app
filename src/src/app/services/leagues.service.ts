import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LeagueCreateDto,
  LeagueDto,
  LeagueJoinRequestDto,
  LeagueListItemDto,
  LeagueMemberDto,
} from '@state/league/league-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CollectionResult } from '../shared/models/sell-confirmation-model';

@Injectable({
  providedIn: 'root',
})
export class LeaguesService {
  constructor(private http: HttpClient) {}

  public create(payload: LeagueCreateDto): Observable<LeagueCreateDto> {
    const url = `${environment.backendUrl}/api/leagues`;
    return this.http.post<LeagueCreateDto>(url, payload);
  }
  public myLeagues(): Observable<Array<LeagueListItemDto>> {
    const url = `${environment.backendUrl}/api/leagues/mine`;
    return this.http.get<Array<LeagueListItemDto>>(url);
  }
  public get(leagueId: string): Observable<LeagueDto> {
    const url = `${environment.backendUrl}/api/leagues/${leagueId}`;
    return this.http.get<LeagueDto>(url);
  }

  public getMembers(leagueId: string): Observable<Array<LeagueMemberDto>> {
    const url = `${environment.backendUrl}/api/leagues/${leagueId}/members`;
    return this.http.get<Array<LeagueMemberDto>>(url);
  }
  public getRequests(
    leagueId: string
  ): Observable<Array<LeagueJoinRequestDto>> {
    const url = `${environment.backendUrl}/api/leagues/${leagueId}/requests`;
    return this.http.get<Array<LeagueJoinRequestDto>>(url);
  }
  public acceptRequest(
    leagueId: string,
    teamId: string
  ): Observable<LeagueJoinRequestDto> {
    const url = `${environment.backendUrl}/api/leagues/${leagueId}/request/accept/${teamId}`;
    return this.http.get<LeagueJoinRequestDto>(url);
  }
  public declineRequest(
    leagueId: string,
    teamId: string
  ): Observable<LeagueJoinRequestDto> {
    const url = `${environment.backendUrl}/api/leagues/${leagueId}/request/decline/${teamId}`;
    return this.http.get<LeagueJoinRequestDto>(url);
  }

  public search(
    name?: string
  ): Observable<CollectionResult<LeagueListItemDto>> {
    const url = name
      ? `${environment.backendUrl}/api/leagues?name=${name}`
      : `${environment.backendUrl}/api/leagues`;
    return this.http.get<CollectionResult<LeagueListItemDto>>(url);
  }
  public checkName(payload: LeagueCreateDto): Observable<LeagueCreateDto> {
    const url = `${environment.backendUrl}/api/leagues/validate`;
    return this.http.post<LeagueCreateDto>(url, payload);
  }

  public join(id: string): Observable<LeagueListItemDto> {
    const url = `${environment.backendUrl}/api/leagues/${id}/request`;
    return this.http.get<LeagueListItemDto>(url);
  }
}
