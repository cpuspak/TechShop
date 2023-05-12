import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { debounce, debounceTime } from 'rxjs';
import { ProductCategoryService } from 'src/app/services/product-category-service/product-category.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { ItemDetailsComponent } from '../item-details/item-details.component';

@Component({
  selector: 'app-filter-by-name',
  templateUrl: './filter-by-name.component.html',
  styleUrls: ['./filter-by-name.component.css']
})
export class FilterByNameComponent implements OnInit {
  products: Array<string> = [];
  searchFormGroup!: FormGroup ;
  filteredProducts: Array<string> = [];
  categoryName: string = ''

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit(): void {
    
    this.initForm()

    this.productCategoryService.productsPipe.subscribe((res: any) => {
      if(res && res.length > 0){
        this.products = []
        this.filteredProducts = []
        res.forEach((element: any) => {
          this.products.push(element.name)
          //this.filteredProducts.push(element.name)
        });
      }
    })
    

  }


  initForm() {
    this.searchFormGroup = this.formBuilder.group({
      'productFormControl': ['']
    })
    this.searchFormGroup.get('productFormControl')!.valueChanges
    .pipe(debounceTime(900))
    .subscribe((res: any) => {
      if(res && res.length > 0)
        this.filterData(res);
      else this.filteredProducts = []
    })
  }

  filterData(enteredData: any) {
    this.filteredProducts = this.products.filter(product => {
      return product.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

}
