import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamChassisDto } from '@state/team-chassis/team-chassis-models';
import { TeamDriverDto } from '@state/team-driver/team-driver-models';
import { TeamEngineDto } from '@state/team-engine/team-engine-models';
import {
  TeamCreateDto,
  TeamDetailsDto,
  TeamUpdateDto,
} from '@state/team/team-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ComponentPurchaseDto,
  SellConfirmationDto,
} from '../shared/models/sell-confirmation-model';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient) {}

  public getOwn(): Observable<TeamDetailsDto> {
    var url = `${environment.backendUrl}/api/team`;
    return this.http.get<TeamDetailsDto>(url);
  }

  public create(team: TeamCreateDto): Observable<TeamDetailsDto> {
    var url = `${environment.backendUrl}/api/team`;
    return this.http.post<TeamDetailsDto>(url, team);
  }

  public update(team: TeamUpdateDto): Observable<TeamDetailsDto> {
    var url = `${environment.backendUrl}/api/team/${team.id}`;
    return this.http.patch<TeamDetailsDto>(url, team);
  }
  public checkName(dto: TeamUpdateDto): Observable<TeamDetailsDto> {
    const url = `${environment.backendUrl}/api/teams/validate`;
    return this.http.post<TeamDetailsDto>(url, dto);
  }

  public getFirstDriver(teamId: string): Observable<TeamDriverDto> {
    var url = `${environment.backendUrl}/api/team/firstdriver/${teamId}`;
    return this.http.get<TeamDriverDto>(url);
  }
  public getSecondDriver(teamId: string): Observable<TeamDriverDto> {
    var url = `${environment.backendUrl}/api/team/seconddriver/${teamId}`;
    return this.http.get<TeamDriverDto>(url);
  }
  public buyFirstDriver(driverId: string): Observable<TeamDriverDto> {
    var url = `${environment.backendUrl}/api/team/firstdriver/${driverId}/buy`;
    return this.http.get<TeamDriverDto>(url);
  }
  public buySecondDriver(driverId: string): Observable<TeamDriverDto> {
    var url = `${environment.backendUrl}/api/team/seconddriver/${driverId}/buy`;
    return this.http.get<TeamDriverDto>(url);
  }
  public sellDriverConfirmation(
    teamDriverId: string
  ): Observable<SellConfirmationDto> {
    var url = `${environment.backendUrl}/api/team/driver/${teamDriverId}/confirm`;
    return this.http.get<SellConfirmationDto>(url);
  }
  public sellDriver(teamDriverId: string): Observable<TeamDriverDto> {
    var url = `${environment.backendUrl}/api/team/driver/${teamDriverId}`;
    return this.http.delete<TeamDriverDto>(url);
  }

  public getEngine(teamId: string): Observable<TeamEngineDto> {
    var url = `${environment.backendUrl}/api/team/engine/${teamId}`;
    return this.http.get<TeamEngineDto>(url);
  }
  public buyEngine(engineId: string): Observable<TeamEngineDto> {
    var url = `${environment.backendUrl}/api/team/engine/${engineId}/buy`;
    return this.http.get<TeamDetailsDto>(url);
  }
  public sellEngineConfirmation(
    teamEngineId: string
  ): Observable<SellConfirmationDto> {
    var url = `${environment.backendUrl}/api/team/engine/${teamEngineId}/confirm`;
    return this.http.get<SellConfirmationDto>(url);
  }
  public sellEngine(teamEngineId: string): Observable<TeamEngineDto> {
    var url = `${environment.backendUrl}/api/team/engine/${teamEngineId}`;
    return this.http.delete<TeamDetailsDto>(url);
  }

  public getChassis(teamId: string): Observable<TeamChassisDto> {
    var url = `${environment.backendUrl}/api/team/${teamId}/chassis`;
    return this.http.get<TeamChassisDto>(url);
  }
  public buyChassis(
    teamId: string,
    chassisId: string
  ): Observable<TeamChassisDto> {
    var url = `${environment.backendUrl}/api/team/${teamId}/chassis/${chassisId}`;
    return this.http.get<TeamChassisDto>(url);
  }
  public sellChassisConfirmation(
    teamChassisId: string
  ): Observable<SellConfirmationDto> {
    var url = `${environment.backendUrl}/api/team/chassis/${teamChassisId}/confirm`;
    return this.http.get<SellConfirmationDto>(url);
  }
  public sellChassis(teamChassisId: string): Observable<TeamChassisDto> {
    var url = `${environment.backendUrl}/api/team/chassis/${teamChassisId}`;
    return this.http.delete<TeamChassisDto>(url);
  }
}
