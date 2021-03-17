import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AccountService } from '../_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  public feeds : any;
  private returnedData: any;

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getFeed()
  }

  logOut(){
    //log out
    this.accountService.logout();

  }

  //fetch feed data
  getFeed(){
    this.accountService.getFeed()
    .pipe(first())
    .subscribe(
      data => {
        this.returnedData = data;
        this.feeds = this.returnedData.results;
        console.log(this.feeds)
      },
      error => {
        console.log(error);
        this.toastr.error('An error occurred in fetching data')
      }
    )
  }
}
