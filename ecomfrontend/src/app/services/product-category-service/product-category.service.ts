import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  public selectedCategory = new Subject()

  categoryListUrl: string = "http://localhost:8081/productCategories/getAllProductCategories"
  
  constructor(private http: HttpClient) { }

  getCategory(){
    return this.http.get(this.categoryListUrl)
  }


}
