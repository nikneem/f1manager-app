import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'f1-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.scss'],
})
export class UserToolbarComponent implements OnInit {
  links = [{ link: '/user/changepassword', text: 'Change password' }];
  constructor() {}

  ngOnInit(): void {}
}
