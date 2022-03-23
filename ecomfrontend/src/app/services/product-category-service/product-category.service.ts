import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  catalogListUrl: string = "http://localhost:8081/productCategories/getAllProductCategories"
  
  constructor(private http: HttpClient) { }

  

  getCatalog(){
    return this.http.get(this.catalogListUrl)
  }

}
