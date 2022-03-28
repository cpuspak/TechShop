import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = "http://localhost:8081/product/getByProductCategoryName"
  urlId: string = "http://localhost:8081/product/getById"
  constructor(private http:HttpClient) { }

  getProductsByCategoryName(productCategoryName: string){
    return this.http.get(this.url + "?productCategoryName="+productCategoryName)
  }

  getProductByProductId(productId: number) {
    return this.http.get(this.urlId + "?productId="+productId)
  }

}
