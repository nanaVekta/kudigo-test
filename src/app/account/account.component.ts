import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services';

@Component({
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    //redirect to home if user is already logged in
    if(this.accountService.userValue){
      this.router.navigate(['../']);
    }
   }

  ngOnInit(): void {
  }

}
