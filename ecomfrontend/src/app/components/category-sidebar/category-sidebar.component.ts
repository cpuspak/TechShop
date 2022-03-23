import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from 'src/app/services/product-category-service/product-category.service';
import { Category } from 'src/app/interfaces/Category'


@Component({
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.component.html',
  styleUrls: ['./category-sidebar.component.css']
})
export class CategorySidebarComponent implements OnInit {

  catagoryList: Array<Category> = []
  
  constructor(private categoryService: ProductCategoryService) {}

  
  ngOnInit(): void {
    this.getCatalogs()
    console.log("in sidebar")
  }

  getCatalogs(){
    this.categoryService.getCatalog().subscribe(
      (response: any) => {
        console.log(response)
        this.catagoryList = response
      },
      error => {
        console.log(error, "error bringing in list of category")
      }
    )
  }

}
