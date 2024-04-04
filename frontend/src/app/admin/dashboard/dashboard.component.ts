import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {





  constructor(private route: Router, private auth: ProductService, private ser: ProductService) { }

  ngOnInit(): void {

    this.userDetails();

    this.getAll();
    this.gettypeByNav();



  }





  user: any;

  userDetails() {
    // Retrieve user details from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      console.log(this.user);
    } else {
      // Handle the case when user details are not found in localStorage
    }
  }






  logout() {
    if (confirm('Confirm Logout')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.route.navigate(['']); // Navigate to a specific route after logout
    } else {
      location.reload(); // Reload the page if confirmation is canceled
    }


  }


  goToProductPage() {

    this.route.navigate(['admin', 'postProduct']);

  }


  product: Product[];



  navbarCategory: any[] = [];

  selectedCategory: string = '';

  getAll() {
      this.ser.getProduct().subscribe((res: Product[]) => {
          this.product = res;
          const uniqueCategories = new Set(res.map(product => product.category));
          this.navbarCategory = [...this.navbarCategory, ...Array.from(uniqueCategories)];
          this.filterProducts();
      });
  }
  
  filteredProducts: Product[] = [];

  filterProducts() {
    if (this.selectedCategory) {
        this.filteredProducts = this.product.filter(product => product.category === this.selectedCategory);
    } else {
        this.filteredProducts = this.product;
    }
}


navbarType: any[] = [];

gettypeByNav() {
  this.ser.getProduct().subscribe((res: Product[]) => {
      console.log(res);

      // Assuming you want to push all unique types into the 'navbarType' array
      const uniqueTypes = new Set(res.map(product => product.type));
      this.navbarType = Array.from(uniqueTypes);
      console.log(uniqueTypes)
  });
}



  UpdateProduct(id: number) {
    this.route.navigate(['admin', 'product', id]);

  }
  DeleteProduct(id: number) {
    this.ser.deleteProduct(id).subscribe((res) => {
      location.reload();
    });

  }

  navigateToCategory(category: string) {
    this.route.navigate(['admin', 'categories', category]); // Adjust the route as needed
  }

  goToAddImagePage() {
    this.route.navigate(['admin', 'carosual']);

  }


  navigateToType(type: string) {
    this.route.navigate(['admin','type', type]); // Adjust the route as needed
  }


  getUserDetalis() {
    this.route.navigate(['admin','getUserDetails']);
    }

  



}
