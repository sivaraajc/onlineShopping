import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CartComponent } from './cart/cart.component';
import { BuynowComponent } from './buynow/buynow.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductPostComponent } from './product-post/product-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { CarosualComponent } from './carosual/carosual.component';
import { CarosualUpdateComponent } from './carosual-update/carosual-update.component';
import { TypeComponent } from './type/type.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GetUserDetailsComponent } from './get-user-details/get-user-details.component';



@NgModule({
  declarations: [
    CartComponent,
    BuynowComponent,
    DashboardComponent,
    ProductPostComponent,
    ProductComponent,
    CategoryComponent,
    CarosualComponent,
    CarosualUpdateComponent,
    TypeComponent,
    GetUserDetailsComponent
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,FormsModule,
    MatSnackBarModule,
  ]
})
export class AdminModule { }
