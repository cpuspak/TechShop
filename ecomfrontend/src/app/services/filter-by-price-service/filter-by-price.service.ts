import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterByPriceService {


  filterClick = new Subject();
  clearFilterClick = new Subject();

  newCategoryClick = new Subject();

  constructor() { }
}
