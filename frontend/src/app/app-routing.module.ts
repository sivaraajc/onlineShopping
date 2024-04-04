import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { TypeComponent } from './type/type.component';



const routes: Routes = [
  {path:"",component:FirstComponent},
  {path:"car",component:ProductComponent},
  { path: "category/:type/:category", component: CategoryComponent }, // Dynamic route for categories
  {path:"user",loadChildren:()=>import('./user/user.module').then(h=>h.UserModule)},
  {path:"admin",loadChildren:()=>import('./admin/admin.module').then(j=>j.AdminModule)},
  {path:"type/:type",component:TypeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
