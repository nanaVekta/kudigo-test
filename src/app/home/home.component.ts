import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.user = this.accountService.userValue;
  }

}
