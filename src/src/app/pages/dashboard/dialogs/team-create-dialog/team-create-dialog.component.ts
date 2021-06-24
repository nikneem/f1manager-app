import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'f1-team-create-dialog',
  templateUrl: './team-create-dialog.component.html',
  styleUrls: ['./team-create-dialog.component.scss'],
})
export class TeamCreateDialogComponent implements OnInit {
  public teamNameForm: FormGroup;
  constructor() {
    this.teamNameForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.min(2),
        Validators.max(100),
      ]),
    });
  }

  ngOnInit(): void {}
}
