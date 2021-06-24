import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseTeamDetailsDialogComponent } from '../../dialogs/base-team-details-dialog/base-team-details-dialog.component';

@Component({
  selector: 'f1-teams-toolbar',
  templateUrl: './teams-toolbar.component.html',
  styleUrls: ['./teams-toolbar.component.scss'],
})
export class TeamsToolbarComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  createBaseTeam() {
    this.dialog.open(BaseTeamDetailsDialogComponent, {
      width: '80%',
    });
  }

  ngOnInit(): void {}
}
