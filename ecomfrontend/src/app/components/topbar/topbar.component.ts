import { AfterContentChecked, AfterContentInit, Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CartItemsService } from 'src/app/services/cartItems-service/cart-items.service';
import { DashboardService } from 'src/app/services/dashboard-service/dashboard.service';
import { LoginCustomerService } from 'src/app/services/login-customer-service/login-customer.service';
import { SidebarServiceService } from 'src/app/services/sidebar-service/sidebar-service.service';
import { CartComponent } from '../cart/cart.component';



@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit, AfterContentInit {
  isLoggedIn: boolean = false;
  showTopbar: boolean = true;
  sideNav !: MatSidenav;
  cartItemCount: number = 0

  constructor(private customerLoginService: LoginCustomerService,
    private router: Router,
    private sideNavService: SidebarServiceService,
    private dashboardService: DashboardService,
    private cartItemService: CartItemsService,
    private dialog: MatDialog) { }

  
  ngOnInit(): void {
    this.isLoggedIn = this.customerLoginService.isLoggedIn();

    if (localStorage.getItem("userName") != null){
      this.cartItemService.getCartItemsCountByCustomerUserName(localStorage.getItem("userName")).subscribe(
        (res: any) => {
          this.cartItemCount = res
          console.log("cartItemCalledFromInit", res)
        }
      )
    }
      

    
  }
  ngAfterContentInit(){
    this.cartItemService.sendCartItemCount.subscribe(
      (res: any) => {
        if (res != null && res >= 0){
          console.log(res)
          this.cartItemCount = res
          console.log("cart called")
        }
      }
    )
  }

  ngDoCheck() {
    this.showTopbar = this.dashboardService.getShowTopbar()
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

  goBackToDashboard() {
    window.location.href = '/dashboard'
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

  showCart() {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '2500px',
      height: '1500px'
    });
  }

}
