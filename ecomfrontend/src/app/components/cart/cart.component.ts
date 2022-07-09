import { AfterContentInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartItem } from 'src/app/interfaces/CartItem';
import { CartItemsService } from 'src/app/services/cartItems-service/cart-items.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterContentInit {

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<CartComponent>,
    private cartItemsService: CartItemsService,
    private snackBar: MatSnackBar) { }

  cartItems !: Array<CartItem>
  unavailableCartItems !: Array<number>
  ngOnInit(): void {
    if (localStorage.getItem("userName") && localStorage.getItem("userName") != ""){
      this.cartItemsService.getCartItemsByCustomerUserName(localStorage.getItem("userName")).subscribe(
        (res: any) => {
          if (res) this.cartItems = res
        }
      )
    }
  }

  ngAfterContentInit(): void {
    this.cartItemsService.sendCartItemCount.subscribe(
      (res: any) => {
        if (localStorage.getItem("userName") && localStorage.getItem("userName") != ""){
          this.cartItemsService.getCartItemsByCustomerUserName(localStorage.getItem("userName")).subscribe(
            (res1: any) => {
              if (res1) this.cartItems = res1
            }
          )
        }
      }
    )

    this.cartItemsService.unavailableCartItems.subscribe(
      (res: any) => {
        if (localStorage.getItem("userName") && localStorage.getItem("userName") != ""){
          this.cartItemsService.getCartItemsByCustomerUserName(localStorage.getItem("userName")).subscribe(
            (res1: any) => {
              for (let index = 0; index < this.cartItems.length; index++) {
                if (this.cartItems[index].id in this.unavailableCartItems)
                  this.cartItems[index].limitExceeded = true
              }
            }
          )
        }
      }
    )
  }

  closeOverlay(){
    this.dialogRef.close()
  }

  checkout(){
    if (localStorage.getItem("userName") && localStorage.getItem("userName") != ""){
      this.cartItemsService.checkoutCartItems(localStorage.getItem("userName")).subscribe(
        (res: any) => {
          console.log("checkout working")
          if (res) {
            console.log(res)
            if (res.length == 0) {
              this.displaySnackBar("sorry payment gateway hasn't been implemented yet")
            } else {
              this.unavailableCartItems = res
              this.cartItemsService.unavailableCartItems.next(1)
            }
          }
        },
        (error: any) => {
          this.displaySnackBar("checkout service currently unavailable")
          console.log(error)
        }
      )

    }
  }
  displaySnackBar(message: string){
    this.snackBar.open(message, "Close", {duration : 2000})
  }

}
