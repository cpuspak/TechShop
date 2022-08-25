import { AfterContentInit, Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
  cartItemsForCheckOut !: Array<CartItem>
  totalPriceForCheckout : number = 0
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
              console.log("this.cartItemsForCheckout = ",this.cartItemsForCheckOut)
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
              if (res1) this.cartItems = res1;
            }
          )
        }
      }
    )

    this.cartItemsService.addCartItemSubject.subscribe(
      (res: any) => {
        if (!this.cartItemsForCheckOut) this.cartItemsForCheckOut = Array<CartItem>(res)
        else this.cartItemsForCheckOut.push(res)
        console.log("updated cart", this.cartItemsForCheckOut)
        this.totalPriceForCheckout += (res.noOfUnits*res.product.price)
      }
      
    )

    this.cartItemsService.removeCartItemSubject.subscribe(
      (res: any) => {
        if (this.cartItemsForCheckOut == undefined || this.cartItemsForCheckOut.length == 0) return;
        for(let i = 0 ; i < this.cartItemsForCheckOut.length ; i++){
          if (this.cartItemsForCheckOut[i].id == res.id) {
            this.cartItemsForCheckOut.splice(i,1)
            break
          }
        }
        console.log("updated cart", this.cartItemsForCheckOut)
        console.log(res)
        this.totalPriceForCheckout -= (res.noOfUnits*res.product.price)
      }
    )

    this.cartItemsService.updatePriceSubject.subscribe(
      (res: any) => {
        console.log("im here ")
        if (!this.cartItemsForCheckOut) return
        this.totalPriceForCheckout = 0
        for(let i = 0 ; i < this.cartItemsForCheckOut.length ; i++){
          if (this.cartItemsForCheckOut[i].noOfUnits > 0)
            this.totalPriceForCheckout += 
            (this.cartItemsForCheckOut[i].noOfUnits * this.cartItemsForCheckOut[i].product.price)
        }
      }
    )

    this.cartItemsService.resetCartSubject.subscribe((res: any) => {
      this.totalPriceForCheckout = 0
      this.cartItemsForCheckOut = []
      if (localStorage.getItem("userName") && localStorage.getItem("userName") != ""){
        this.cartItemsService.getCartItemsByCustomerUserName(localStorage.getItem("userName")).subscribe(
          (res1: any) => {
            if (res1) this.cartItems = res1;
          }
        )
      }
    })

    // this.cartItemsService.reRenderCartItemsSubject.subscribe(
    //   (res: any) => {
    //     for(let i = 0 ; i < res.length ; i++){
    //       for(let j = 0 ; j < this.cartItems.length ; j++){
    //         if (res[i].id == this.cartItems[j].id){
    //           this.cartItems[j] = res[i]
    //           break
    //         }
    //       }
    //     }
    //   }
    // )

  }

  

  closeOverlay(){
    this.dialogRef.close()
  }

  checkout(){
    if (this.cartItemsForCheckOut.length > 0) this.displaySnackBar("sorry payment gateway is not implemented yet")
    // if (localStorage.getItem("userName") && localStorage.getItem("userName") != ""){
    //   this.cartItemsService.checkoutCartItems(this.cartItemsForCheckOut).subscribe(
    //     (res: any) => {
    //       if (res.length == 0){
    //         this.displaySnackBar("sorry payment gateway is not implemented yet")
    //       } else {
    //         this.cartItemsService.reRenderCartItemsSubject.next(res)
    //       }
    //     }, (error: any) => {
    //       this.displaySnackBar("checkout service is unavailable at the moment")
    //     }
    //   )
    // }
  }
  displaySnackBar(message: string){
    this.snackBar.open(message, "Close", {duration : 2000})
  }

}
