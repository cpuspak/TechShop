import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private dashboardService: DashboardService) { }

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

}
