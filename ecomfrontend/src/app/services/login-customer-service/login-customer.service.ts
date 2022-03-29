import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerCredentials } from 'src/app/interfaces/CustomerCredentials';

@Injectable({
  providedIn: 'root'
})
export class LoginCustomerService {

  loginUrl: string = "http://localhost:8081/customer/authenticate"

  constructor(
    private http: HttpClient
  ) { }

  
  generateToken(customerCredentials: CustomerCredentials){
    console.log(customerCredentials)
    return this.http.post(this.loginUrl, customerCredentials)
  }

  loginCustomer(token: string, userName: string): boolean{
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName)
    return true;
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem("token")
    if (token == undefined || token == null || token == "") return false
    else return true
  }

  logoutCustomer(): boolean{
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    return true
  }

}
