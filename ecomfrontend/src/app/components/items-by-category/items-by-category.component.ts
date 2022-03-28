import { Component, DoCheck, OnInit } from '@angular/core';
import { ProductCategoryService } from 'src/app/services/product-category-service/product-category.service';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-items-by-category',
  templateUrl: './items-by-category.component.html',
  styleUrls: ['./items-by-category.component.css']
})
export class ItemsByCategoryComponent implements OnInit, DoCheck {


  category: string = ""
  products:any = null
  constructor(private productCategoryService:ProductCategoryService,
    private productService:ProductService) { }
  
  ngOnInit(): void {
    this.fetchProducts()
  }

  ngDoCheck() {
  }

  fetchProducts() {
    this.productCategoryService.selectedCategory.subscribe(
      (res:any) => {
        this.category = res
        this.productService.getProductsByCategoryName(this.category).subscribe(
          (res: any) => {
            this.products = res
            console.log(res)
          },
          err => {
            console.log("error getting products by product category", err)
          }
        )
      },
      err => {
        console.log("Error getting currently selected category")
      }
    )
  }

}
