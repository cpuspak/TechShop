import { Component, OnInit } from '@angular/core';
import { LoginCustomerService } from 'src/app/services/login-customer-service/login-customer.service';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MyErrorStateMatcher} from '../../MyErrorStateMatcher';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  userName: string = ""
  password: string = ""
  hide = true;
  loginErr = false;
  loading: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private customerLoginService: LoginCustomerService
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.loading = true;
    var customerCredentials = {
      userName: this.userName,
      password: this.password
    }

    if (customerCredentials.userName != "" && customerCredentials.password != ""){
      this.customerLoginService.generateToken(customerCredentials).subscribe(
        (response: any) => {
          console.log(response)
          this.customerLoginService.loginCustomer(response.jwt, customerCredentials.userName)
          window.location.href = 'dashboard'
          this.loginErr = false
          this.loading = false;
        },
        error => {
          console.log(error)
          this.loginErr = true
          this.loading = false;
        }
      );
      
      
    } else this.loading = false;
    
  }
  passwordEmpty(): boolean {
    if (this.password.length == 0) return true;
    return false;
  }

  emailEmpty(): boolean {
    if (this.userName.length == 0) return true;
    return false;
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
}
