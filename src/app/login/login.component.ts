import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../_models/user';
import { AccountService } from '../_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  user: User;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  //define validation errors
  validation_messages = {

    email: [
      { type: 'required', message: 'email is required.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be more than 8 characters long.' }
    ]
  }

  //set a getter for form controls
  get f() { return this.loginForm.controls; }

  submitLogin(){
    this.submitted = true;

    //check if form is valid
    if(this.loginForm.invalid){
      return false;
    }

    //continue if form is valid
    this.loading = true;

    this.accountService.login(this.loginForm.value)
    .pipe(first())
    .subscribe(
      data => {
        this.loading = false
        this.user = data;
        if(this.user.id){
          this.toastr.success("Login successful");
          this.router.navigate([this.returnUrl]);
         
        }
        else{
          this.toastr.error("Credentials do not match");
        }
      },
      error => {
        this.loading = false;
        this.toastr.error("Credentials do not match");
        console.log(error);
      }
    )
  }
}
