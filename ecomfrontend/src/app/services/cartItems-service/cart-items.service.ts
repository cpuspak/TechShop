import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {
  getNumberOfCartItemsByCustomerUserNameUrl: string = "http://localhost:8081/cartItem/getNumberOfCartItemsByCustomerUserName"
  addItemsToCartUrl: string = "http://localhost:8081/cartItem/addCartItemByCustomerIdAndProductId"
  getCartItemsByCustomerUserNameUrl: string = "http://localhost:8081/cartItem/getCartItemsByCustomerUserName"
  removeCartItemsByCartItemIdUrl: string = "http://localhost:8081/cartItem/removeCartItemByCartItemId"
  checkoutCartItemByCartItemsListUrl: string = "http://localhost:8081/cartItem/checkoutCartItemByCartItemsList"


  sendCartItemCount = new Subject()
  decreaseFromCartItemsCount = new Subject()
  unavailableCartItems = new Subject()
  // getCartItemSubject = new Subject()
  // sendCartItemSubject = new Subject()
  addCartItemSubject = new Subject()
  removeCartItemSubject = new Subject()
  reRenderCartItemsSubject = new Subject()
  updatePriceSubject = new Subject()


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

  getCartItemsByCustomerUserName(userName: any) {
    return this.http.get(this.getCartItemsByCustomerUserNameUrl + "?customerUserName="+ userName);
  }

  removeItemsFromCart(cartItemId: any){
    return this.http.delete(this.removeCartItemsByCartItemIdUrl + "?cartItemId="+ cartItemId);
  }

  checkoutCartItems(cartItems: any){
    console.log("cartItems to checkout", cartItems)
    return this.http.post(this.checkoutCartItemByCartItemsListUrl,{"cartItemList": cartItems});
  }

}
