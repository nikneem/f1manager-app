import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'f1-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent implements OnInit {
  @Input() public pageTitle: string = 'Users';
  constructor() {}

  ngOnInit(): void {}
}
