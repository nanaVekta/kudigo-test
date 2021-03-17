import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services';
import { PasswordValidator } from '../_validators/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private accountService: AccountService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone_number: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirm_password: ['', Validators.compose([Validators.required, PasswordValidator.equalTo])]
    });


  }

  //define validation errors
  validation_messages = {
    first_name: [
      { type: 'required', message: 'first name is required.' }
    ],
    last_name: [
      { type: 'required', message: 'last name is required.' }
    ],

    email: [
      { type: 'required', message: 'email is required.' }
    ],

    phone_number: [
      { type: 'required', message: 'phone number is required.' }
    ],

    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be more than 8 characters long.' }
    ],

    confirm_password: [
      { type: 'required', message: 'Retype your password.' },
      { type: 'equalTo', message: 'Passwords do not match.' }
    ]
  }

  //set a getter for form controls
  get f() { return this.registerForm.controls; }

  submitRegistration(){
    this.submitted = true;

    //check if form is valid
    if(this.registerForm.invalid){
      return false;
    }

    //continue if form is valid
    this.loading = true;

    this.accountService.register(this.registerForm.value)
    .pipe(first())
    .subscribe(
      data => {
        this.user = data;
        if(this.user.id){
          this.toastr.success("Account creation successful");
          this.router.navigate(['/home']);

        }
        else{
          this.toastr.error("Error in creating account");
        }
      },
      error => {
        this.toastr.error("A fatal error occurred");
        console.log(error);
      }
    )
  }
}
