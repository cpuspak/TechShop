import { AfterContentInit, Component, DoCheck, OnInit } from '@angular/core';
import { FilterByPrice } from 'src/app/interfaces/FilterByPrice';
import { FilterByPriceService } from 'src/app/services/filter-by-price-service/filter-by-price.service';
import { ProductCategoryService } from 'src/app/services/product-category-service/product-category.service';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-items-by-category',
  templateUrl: './items-by-category.component.html',
  styleUrls: ['./items-by-category.component.css']
})
export class ItemsByCategoryComponent implements OnInit, DoCheck, AfterContentInit {


  category: string = ""
  products:any = null
  constructor(private productCategoryService:ProductCategoryService,
    private productService:ProductService,
    private filterByPriceService: FilterByPriceService) { }
  
  ngOnInit(): void {
    this.fetchProducts()
  }

  ngDoCheck() {
  }

  ngAfterContentInit(): void {
      this.filterByPriceService.filterClick.subscribe((val: any) => {
        this.productService.getProductsByCategoryNameAndPrice(this.category, val.minValue, val.maxValue).subscribe(
          (val1: any) => {
            console.log("val1",val1)
            //if (val1.length > 0) 
            this.products = val1;
        }, err => {
          console.log("error getting filtered data")
        })
      })

      this.filterByPriceService.clearFilterClick.subscribe((val: any) => {
        this.productService.getProductsByCategoryName(this.category).subscribe(
          (res: any) => {
            console.log(res)
            this.products = res
          },
          err => {
            console.log("error getting products by product category", err)
          }
        )
      })
  }

  fetchProductsByPrice() {
    this.productService
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
