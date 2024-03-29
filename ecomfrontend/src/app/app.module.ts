import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { CategorySidebarComponent } from './components/category-sidebar/category-sidebar.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { CartComponent } from './components/cart/cart.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { ItemsByCategoryComponent } from './components/items-by-category/items-by-category.component';
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponentComponent } from './components/register-component/register-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import {MatList, MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { ItemTileComponent } from './components/item-tile/item-tile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { FilterByPriceComponent } from './components/filter-by-price/filter-by-price.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FilterByNameComponent } from './components/filter-by-name/filter-by-name.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    CategorySidebarComponent,
    ItemDetailsComponent,
    TopbarComponent,
    CartComponent,
    CustomerProfileComponent,
    ItemsByCategoryComponent,
    ProfileSidebarComponent,
    RegisterComponentComponent,
    CustomerDashboardComponent,
    ItemTileComponent,
    CartItemsComponent,
    FilterByPriceComponent,
    FilterByNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatAutocompleteModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
