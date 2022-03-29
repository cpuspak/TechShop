import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  url: string = "http://localhost:8081/cartItem/getNumberOfCartItemsByCustomerUserName"
  sendCartItemCount = new Subject()

  constructor(private http: HttpClient) { }

  getCartItemsCountByCustomerUserName(userName: any){
    return this.http.get(this.url + "?customerUserName="+ userName)
  }
}
