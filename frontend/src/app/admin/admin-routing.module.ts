import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { BuynowComponent } from './buynow/buynow.component';
import { ProductPostComponent } from './product-post/product-post.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { CarosualComponent } from './carosual/carosual.component';
import { CarosualUpdateComponent } from './carosual-update/carosual-update.component';
import { AuthGuard } from '../AuthGuard.service';
import { TypeComponent } from './type/type.component';
import { GetUserDetailsComponent } from './get-user-details/get-user-details.component';

const routes: Routes = [
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
  {path:"cart",component:CartComponent,canActivate:[AuthGuard]},
  {path:"buynow",component:BuynowComponent,canActivate:[AuthGuard]},
  {path:"postProduct",component:ProductPostComponent,canActivate:[AuthGuard]},
  {path:"product/:id",component:ProductComponent,canActivate:[AuthGuard]},
  { path:"category/:type/:category", component: CategoryComponent,canActivate:[AuthGuard]},
  {path:"carosual",component:CarosualComponent,canActivate:[AuthGuard]},
  {path:"carosualUpdate/:id",component:CarosualUpdateComponent,canActivate:[AuthGuard]},
  {path:"type/:type",component:TypeComponent,canActivate:[AuthGuard]},
  {path:"getUserDetails",component:GetUserDetailsComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
