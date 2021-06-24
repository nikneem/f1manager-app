import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'f1-admin-toolbar',
  templateUrl: './admin-toolbar.component.html',
  styleUrls: ['./admin-toolbar.component.scss'],
})
export class AdminToolbarComponent implements OnInit {
  links = [
    { link: '/admin/teams', text: 'Teams' },
    { link: '/admin/drivers', text: 'Drivers' },
    // { link: '/admin/engines', text: 'Engines' },
    { link: '/admin/chassis', text: 'Chassis' },
    { link: '/admin/results', text: 'Race results' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
