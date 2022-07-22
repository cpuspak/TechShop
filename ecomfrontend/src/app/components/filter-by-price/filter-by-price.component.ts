import { Component, OnInit } from '@angular/core';
import { FilterByPriceService } from 'src/app/services/filter-by-price-service/filter-by-price.service';
import { FilterByPrice } from 'src/app/interfaces/FilterByPrice';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-filter-by-price',
  templateUrl: './filter-by-price.component.html',
  styleUrls: ['./filter-by-price.component.css']
})
export class FilterByPriceComponent implements OnInit {
  noOfItemsValidatorMin = new FormControl('',[Validators.required, Validators.pattern('[0-9]*[\.]?[0-9]+')])
  noOfItemsValidatorMax = new FormControl('',[Validators.required, Validators.pattern('[0-9]*[\.]?[0-9]+')])
  displayFilterMinValue: string = ""
  displayFilterMaxValue: string = ""

  minValueVar: string = ""
  maxValueVar: string = ""
  
  constructor(private filterByPriceService: FilterByPriceService) { }

  

  ngOnInit(): void {
  }

  filterClick(minValue: string, maxValue: string) {
    this.displayFilterMinValue = minValue
    this.displayFilterMaxValue = maxValue
    if (minValue == "") {
      minValue = "-1"
      this.displayFilterMinValue = "0"
    }
    if (maxValue == "") {
      maxValue = "-1"
      this.displayFilterMaxValue = "Max"
    }
    let filterByPrice: FilterByPrice = {"minValue": minValue, "maxValue": maxValue}
    
    this.filterByPriceService.filterClick.next(filterByPrice);
  }

  clearFilterClick() {
    this.displayFilterMaxValue = ""
    this.displayFilterMinValue = ""
    this.minValueVar = ""
    this.maxValueVar = ""
    this.filterByPriceService.clearFilterClick.next(0);
  }

}
