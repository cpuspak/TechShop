import { AfterContentInit, Component, DoCheck, OnInit } from '@angular/core';
import { FilterByPrice } from 'src/app/interfaces/FilterByPrice';
import { FilterByPriceService } from 'src/app/services/filter-by-price-service/filter-by-price.service';
import { ProductCategoryService } from 'src/app/services/product-category-service/product-category.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { LoginCustomerService } from 'src/app/services/login-customer-service/login-customer.service';


@Component({
  selector: 'app-items-by-category',
  templateUrl: './items-by-category.component.html',
  styleUrls: ['./items-by-category.component.css']
})
export class ItemsByCategoryComponent implements OnInit, DoCheck, AfterContentInit {


  category: string = ""
  products:any = null
  isLoggedIn: boolean = false
  loadingProducts: boolean = false;
  constructor(private productCategoryService:ProductCategoryService,
    private productService:ProductService,
    private filterByPriceService: FilterByPriceService,
    private loginService: LoginCustomerService) { }
  
  ngOnInit(): void {
    this.fetchProducts()
    this.isLoggedIn = this.loginService.isLoggedIn()
  }

  ngDoCheck() {
  }

  ngAfterContentInit(): void {
      // this.filterByPriceService.filterClick.subscribe((val: any) => {
      //   this.productService.getProductsByCategoryNameAndPrice(this.category, val.minValue, val.maxValue).subscribe(
      //     (val1: any) => {
      //       console.log("val1",val1)
      //       //if (val1.length > 0) 
      //       this.products = val1;
      //   }, err => {
      //     console.log("error getting filtered data")
      //   })
      // })

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
        console.log("category", this.category)
        this.loadingProducts = true;
        this.productService.getProductsByCategoryName(this.category).subscribe(
          (res: any) => {
            this.products = res
            //console.log(res)
            this.loadingProducts = false;
            this.filterByPriceService.newCategoryClick.next(0);
          },
          err => {
            this.loadingProducts = false;
            console.log("error getting products by product category", err)
          }
        )
      },
      err => {
        this.loadingProducts = false;
        console.log("Error getting currently selected category")
      }
    )
  }

}
