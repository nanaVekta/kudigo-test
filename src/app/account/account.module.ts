import { AccountRoutingModule } from './account-routing.module';
import { SignupComponent } from './../signup/signup.component';
import { LoginComponent } from './../login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
