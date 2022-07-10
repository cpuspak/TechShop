import { AfterContentInit, Component, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../../interfaces/CartItem';
import { CartItemsService } from 'src/app/services/cartItems-service/cart-items.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit, AfterContentInit {

  numberOfItemsValidator = new FormControl('', [Validators.required, Validators.min(1)]);
  numberOfItems: any;
  messageOfUnavailabilty: any;
  @Input() cartItem!: CartItem;
  checkboxId: string = " checkbox"
  checked: boolean = false
  
  constructor(private cartItemsService: CartItemsService,
    private snackBar: MatSnackBar,
    private cartItemService: CartItemsService) { }

  ngOnInit(): void {
    console.log(this.cartItem)
    if (this.cartItem && this.cartItem.noOfUnits) this.numberOfItems = this.cartItem.noOfUnits
    if (this.cartItem && this.cartItem.id) this.checkboxId = this.cartItem.id+this.checkboxId
  }

  ngAfterContentInit(): void {
      this.cartItemService.unavailableCartItems.subscribe(
        (res: any) => {
          if (res == 1)
            this.messageOfUnavailabilty = "so much stock is not available for this item, please try to reduce stock size and try to checkout"
          else this.messageOfUnavailabilty = ""
        }
      )

      
  }

  deleteCartItem(event: any){
    if (event && event.target && event.target.id != ""){
      this.cartItemsService.removeItemsFromCart(event.target.id).subscribe(
        (res: any) => {
          if (res) {
            //console.log(res)
            this.cartItemService.getCartItemsCountByCustomerUserName(localStorage.getItem("userName")).subscribe(
              (res1: any) => {
                console.log(res1)
                this.cartItemService.sendCartItemCount.next(res1)
                this.displaySnackBar("Item removed from cart")
              }
            )
            this.displaySnackBar("item removed from cart");
          }
        },
        (error: any) => {
          this.displaySnackBar("error removing item from cart");
        }
      )
    }
  }

  insertOrRemoveFromBuyList(event: any){
    console.log(event)
    this.checked = !this.checked
    console.log(this.checked)
    if (this.checked){
      this.cartItemService.addCartItemSubject.next(this.cartItem)
    } else {
      this.cartItemService.removeCartItemSubject.next(this.cartItem)
    }
  }



  displaySnackBar(message: string){
    this.snackBar.open(message, "Close", {duration : 2000})
  }
}
