import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  getNumberOfCartItemsByCustomerUserNameUrl: string = "http://localhost:8081/cartItem/getNumberOfCartItemsByCustomerUserName"
  addItemsToCartUrl: string = "http://localhost:8081/cartItem/addCartItemByCustomerIdAndProductId"
  sendCartItemCount = new Subject()

  constructor(private http: HttpClient) { }

  getCartItemsCountByCustomerUserName(userName: any){
    return this.http.get(this.getNumberOfCartItemsByCustomerUserNameUrl + "?customerUserName="+ userName)
  }

  addItemsToCart(userName: any, productId: any, count: any){
    console.log(userName)
    let addItemsToCartObject = {
      "customerUserName": userName,
      "productId": productId,
      "count": count
    }
    
    return this.http.put(this.addItemsToCartUrl,addItemsToCartObject)
  }

}
