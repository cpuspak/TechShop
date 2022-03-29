import { Component, OnInit } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemsService } from 'src/app/services/cartItems-service/cart-items.service';
import { DashboardService } from 'src/app/services/dashboard-service/dashboard.service';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  productId: any
  productDetails: any
  constructor(private router: ActivatedRoute,
    private productService: ProductService,
    private dashboardService: DashboardService,
    private cartItemService: CartItemsService) { }

  ngOnInit(): void {
    this.dashboardService.setShowTopbar(false)
    if (this.router.snapshot.paramMap.get('id') != null){
      this.productId = this.router.snapshot.paramMap.get('id')
      console.log(this.productId)
      this.productService.getProductByProductId(this.productId).subscribe(
        (res: any) => {
          this.productDetails = res
          console.log(this.productDetails)
        }
      )
    }
      
    console.log(this.productId)
  }

  callCart(){
    if (localStorage.getItem("userName") != null){
      this.cartItemService.getCartItemsCountByCustomerUserName(localStorage.getItem("userName")).subscribe(
        (res: any) => {
          this.cartItemService.sendCartItemCount.next(res)
        }
      )
    }
    
  }

}
