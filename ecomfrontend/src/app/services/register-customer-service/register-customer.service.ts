import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerRegister } from 'src/app/interfaces/CustomerRegister';

@Injectable({
  providedIn: 'root'
})
export class RegisterCustomerService {

  registerUrl: string = "http://localhost:8081/customer/registerCustomer"

  constructor(private http: HttpClient) { }

  registerCustomer(customerRegisterBody: CustomerRegister) {
    return this.http.post(this.registerUrl, customerRegisterBody)
  }

}
