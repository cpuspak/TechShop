import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginCustomerService } from 'src/app/services/login-customer-service/login-customer.service';
import { SidebarServiceService } from 'src/app/services/sidebar-service/sidebar-service.service';



@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  sideNav !: MatSidenav;

  constructor(private customerLoginService: LoginCustomerService,
    private router: Router,
    private sideNavService: SidebarServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.customerLoginService.isLoggedIn();
  }

  ngAfterViewInit() {
    this.sideNavService.sideBarSubject.subscribe(
      (response: MatSidenav) => {
        this.sideNav = response
        console.log("in response", response)
      }
    )
  }

  toggleSideNav(){
    if (this.sideNav != undefined){
      this.sideNav.toggle()
    }
  }

  loginCustomer(){
    window.location.href = '/login'
  }

  logoutCustomer(){
    this.customerLoginService.logoutCustomer();
    window.location.href = '/login'
  }

  userProfile(){
    window.location.href = '/customerProfile'
  }

  registerCustomer() {
    window.location.href = '/register'
  }

}
