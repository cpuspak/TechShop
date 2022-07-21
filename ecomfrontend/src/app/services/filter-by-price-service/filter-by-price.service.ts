import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterByPriceService {


  filterClick = new Subject();
  constructor() { }
}
