import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { BuynowComponent } from './buynow/buynow.component';
import { AboutComponent } from './about/about.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { AuthGuard } from '../AuthGuard.service';
import { TypeComponent } from './type/type.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
  {path:"cart",component:CartComponent,canActivate:[AuthGuard]},
  {path:"buynow/:id",component:BuynowComponent,canActivate:[AuthGuard]},
  {path:"about",component:AboutComponent},
  {path:"product",component:ProductComponent},
  { path: "category/:type/:category", component: CategoryComponent},
  {path:"type/:type",component:TypeComponent},
  {path:"forgetPassword/:username",component:ForgetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
