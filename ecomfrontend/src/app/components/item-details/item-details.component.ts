import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemsService } from 'src/app/services/cartItems-service/cart-items.service';
import { DashboardService } from 'src/app/services/dashboard-service/dashboard.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { ProductId } from 'src/app/interfaces/ProductId';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  productId: any
  productDetails: any
  numberOfItems: any
  loading: boolean = false;
  addToCartLoading: boolean = false;

  numberOfItemsValidator = new FormControl('', [Validators.required, Validators.min(1)]);

  constructor(private router: ActivatedRoute,
    private productService: ProductService,
    private dashboardService: DashboardService,
    private cartItemService: CartItemsService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ItemDetailsComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: ProductId) { }

  ngOnInit(): void {
    this.numberOfItems = 1
    console.log(this.data.productId)
    
    if (this.data && this.data.productId) {
      this.loading = true;
      this.productService.getProductByProductId(this.data.productId).subscribe(
        (res: any) => {
          console.log(res)
          this.productDetails = res
          this.loading = false;
        }
      )
    }

    //this.dashboardService.setShowTopbar(false)
    // if (this.router.snapshot.paramMap.get('id') != null){
    //   this.productId = this.router.snapshot.paramMap.get('id')
    //   console.log(this.productId)
    //   this.productService.getProductByProductId(this.productId).subscribe(
    //     (res: any) => {
    //       this.productDetails = res
    //       console.log(this.productDetails)
    //     }
    //   )
    // }
      
    //console.log(this.productId)
  }

  

  addToCart(){
    console.log("customer user name", localStorage.getItem("userName"), " product id", this.data.productId)
    if (localStorage.getItem("userName") != null){
      // this.cartItemService.getCartItemsCountByCustomerUserName(localStorage.getItem("userName")).subscribe(
      //   (res: any) => {
      //     console.log("add to cart",res)
      //     this.cartItemService.sendCartItemCount.next(res)
      //   }
      // )
      this.addToCartLoading = true
      this.cartItemService.addItemsToCart(localStorage.getItem("userName"), this.data.productId, this.numberOfItems).subscribe(
        (res: any) => {
          console.log("add to cart",res)
          if (res) {
            this.cartItemService.getCartItemsCountByCustomerUserName(localStorage.getItem("userName")).subscribe(
              (res1: any) => {
                this.cartItemService.sendCartItemCount.next(res1)
                this.displaySnackBar("Items added to cart")
                this.addToCartLoading = false;
              }
            )
          }
          //this.cartItemService.sendCartItemCount.next(res)
        }, (error : any) => {
          console.log("don't have so much stock")
          this.displaySnackBar("don't have so much stock")
          this.addToCartLoading = false
        }
      )
    }
    
  }

  closeOverlay(){
    this.dialogRef.close()
  }

  displaySnackBar(message: string){
    this.snackBar.open(message, "Close", {duration : 2000})
  }

}
