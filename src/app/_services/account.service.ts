import { ToastrService } from 'ngx-toastr';

import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';



@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private toastr: ToastrService
    ) {
        //create a new user subject
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }


   addData(user){
      this.userSubject.next(null);
      this.userSubject.next(user);
    }

    login(formData) {
        return this.http.post<User>(`${environment.apiUrl}/users/login/`, formData)
            .pipe(map(user => {
                // store user details and token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
      return this.http.post(`${environment.apiUrl}/users/logout/`, {})
        .pipe(first())
        .subscribe(
          data => {
            localStorage.removeItem('user');
            this.userSubject.next(null);

            this.router.navigate(['account/login']);
          },
          error => {
            this.toastr.error("Fatal error");
          }
        );


      }

    register(formData: User) {
        return this.http.post<User>(`${environment.apiUrl}/users/signup/`, formData)
        .pipe(map(user => {
          // store user details and token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
      }));

    }

    getFeed(){
      return this.http.get(`${environment.apiUrl}/mainfeed/`);
    }

}
