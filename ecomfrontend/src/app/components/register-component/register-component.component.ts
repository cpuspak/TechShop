import { Component, OnInit } from '@angular/core';
import { RegisterCustomerService } from 'src/app/services/register-customer-service/register-customer.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MyErrorStateMatcher} from '../../MyErrorStateMatcher';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent implements OnInit {

  constructor(private registerCustomerService: RegisterCustomerService) { }

  userName: string = ""
  password: string = ""
  name: string = ""
  address: string = ""
  hide = true
  registrationErr = 0
  loading: boolean = false

  ngOnInit(): void {
    this.registrationErr = 0
  }

  doRegister(){
    this.loading = true;
    var customerRegisterBody = {
      userName: this.userName,
      password: this.password,
      name: this.name,
      address: this.address,
    }
    this.registerCustomerService.registerCustomer(customerRegisterBody).subscribe(
      response => {
        this.loading = false;
        console.log(response)
        this.registrationErr = 1
      },
      error => {
        this.loading = false
        console.log(error)
        this.registrationErr = 2
      }
    )
  }

  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

}
