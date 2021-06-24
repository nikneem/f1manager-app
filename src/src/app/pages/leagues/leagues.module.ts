import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaguesRoutingModule } from './leagues-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { LeagueEffects } from '@state/league/league-effects';
import { LeagueOverviewPageComponent } from './pages/league-overview-page/league-overview-page.component';
import { LeagueCreateDialogComponent } from './dialogs/league-create-dialog/league-create-dialog.component';
import { LeagueDetailsPageComponent } from './pages/league-details-page/league-details-page.component';
import { LeagueInviteDialogComponent } from './dialogs/league-invite-dialog/league-invite-dialog.component';
import { LeagueRequestDialogComponent } from './dialogs/league-request-dialog/league-request-dialog.component';
import { LeagueToolbarComponent } from './components/league-toolbar/league-toolbar.component';
import { LeagueBaseInformationComponent } from './components/league-base-information/league-base-information.component';
import { LeagueMembersListComponent } from './components/league-members-list/league-members-list.component';
import { LeagueJoinRequestsComponent } from './components/league-join-requests/league-join-requests.component';

@NgModule({
  imports: [
    CommonModule,
    LeaguesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([LeagueEffects]),
  ],
  declarations: [
    LeagueOverviewPageComponent,
    LeagueCreateDialogComponent,
    LeagueDetailsPageComponent,
    LeagueInviteDialogComponent,
    LeagueRequestDialogComponent,
    LeagueToolbarComponent,
    LeagueBaseInformationComponent,
    LeagueMembersListComponent,
    LeagueJoinRequestsComponent,
  ],
})
export class LeaguesModule {}
