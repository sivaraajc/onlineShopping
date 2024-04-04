import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: ProductService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.auth.getUser();
    
  
    if (!user) {
      // User is not logged in, redirect to login page
      this.router.navigate(['/user/login']);
      return false;
    } else if (user.roles === 'ADMIN' && state.url.startsWith('/admin')) {
      // User has ADMIN role and trying to access an admin route
      return true;
    } else if (user.roles === 'USER' && state.url.startsWith('/user')) {
      // User has USER role and trying to access a user route
      return true;
    } else {
      // Unauthorized access, display alert and redirect to dashboard
      alert("Unauthorized access. Redirecting to dashboard.");
      this.router.navigate([`${user.roles.toLowerCase()}`,'dashboard']); // Adjust the destination route as needed
      return false;
    }
  }
}
