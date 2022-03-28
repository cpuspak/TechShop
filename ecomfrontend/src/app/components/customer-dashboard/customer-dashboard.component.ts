import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard-service/dashboard.service';
import { LoginCustomerService } from 'src/app/services/login-customer-service/login-customer.service';
import { ProductCategoryService } from 'src/app/services/product-category-service/product-category.service';
import { SidebarServiceService } from 'src/app/services/sidebar-service/sidebar-service.service';
import { LoginComponentComponent } from '../login-component/login-component.component';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSidenav) snav !: MatSidenav;

  constructor(private customerLoginService: LoginCustomerService,
    private sideBarService: SidebarServiceService,
    private router: Router,
    private dashboardService: DashboardService,
    private productCategoryService: ProductCategoryService) { }
  
  //showTopbar: string = "1"
  // 0 -> list of products according to category
  // 1 -> product view
  // 2 -> profile view

  ngOnInit(): void {
    this.dashboardService.setShowTopbar(true)
  }

  ngDoCheck() {

  }


  ngAfterViewInit() {
    console.log("in dashboard",this.snav)
    if (this.snav != undefined){
      this.sideBarService.sideBarSubject.next(this.snav)
    }
  }
}
