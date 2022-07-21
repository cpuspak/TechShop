import { Component, OnInit } from '@angular/core';
import { FilterByPriceService } from 'src/app/services/filter-by-price-service/filter-by-price.service';
import { FilterByPrice } from 'src/app/interfaces/FilterByPrice';

@Component({
  selector: 'app-filter-by-price',
  templateUrl: './filter-by-price.component.html',
  styleUrls: ['./filter-by-price.component.css']
})
export class FilterByPriceComponent implements OnInit {

  constructor(private filterByPriceService: FilterByPriceService) { }

  ngOnInit(): void {
  }

  filterClick(minValue: string, maxValue: string) {
    let filterByPrice: FilterByPrice = {"minValue": minValue, "maxValue": maxValue}
    
    this.filterByPriceService.filterClick.next(filterByPrice);
  }

}
