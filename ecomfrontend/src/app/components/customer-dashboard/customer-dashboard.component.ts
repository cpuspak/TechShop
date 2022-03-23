import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginCustomerService } from 'src/app/services/login-customer-service/login-customer.service';
import { SidebarServiceService } from 'src/app/services/sidebar-service/sidebar-service.service';
import { LoginComponentComponent } from '../login-component/login-component.component';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {

  @ViewChild(MatSidenav) snav !: MatSidenav;

  constructor(private customerLoginService: LoginCustomerService,
    private sideBarService: SidebarServiceService,
    private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log("in dashboard",this.snav)
    if (this.snav != undefined){
      this.sideBarService.sideBarSubject.next(this.snav)
    }
  }
}
