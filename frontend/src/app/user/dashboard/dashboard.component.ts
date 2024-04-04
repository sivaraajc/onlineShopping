import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/cart';
import { CartService } from 'src/app/cart.service';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


   // Add a property to store the search term
   searchTerm:string='';

   // Add a property to store the search results
   searchResults: Product[] = [];



  constructor(private route: Router, private auth: ProductService, private ser: ProductService, private serv: CartService, private cdr: ChangeDetectorRef) { }

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





  product: Product[];




  navbar: any[] = [];

  getAll() {

    this.ser.getProduct().subscribe((res: Product[]) => {
      this.product = res;
      console.log(res);

      // Assuming you want to push all unique categories into the 'navbar' array
      const uniqueCategories = new Set(res.map(product => product.category));
      this.navbar = [...this.navbar, ...Array.from(uniqueCategories)];
    });

  }



  gotoBuyNow(id: number) {
    this.route.navigate(['user','buynow',id]);

  }




  AddToCart(productId: number) {

    const userId = this.user.id;
    const users = { productId, userId } as Cart;

    this.serv.postCart(users).subscribe((res) => {
      alert("Item Added to Cart");

    });
  }

  gotoCartPage() {
    this.route.navigate(['user', 'cart']);

  }

  navigateToCategory(category: string) {
    this.route.navigate(['user', 'categories', category]); // Adjust the route as needed
  }




 // Add the following method for search functionality
searchProducts() {

  this.ser.getproductByNameUsingFilter(this.searchTerm).subscribe((res)=>{
    this.searchResults=res;
  })

  if(this.searchTerm ===''){
    this.clearSearch();
  }
}

onSearchChange(event: Event) {
  const searchTerm = (event.target as HTMLInputElement).value;
  this.searchTerm = searchTerm;
  this.searchProducts();
}


  clearSearch() {
    // Clear the search term and results
    this.searchTerm = '';
    this.searchResults = [];
    console.log('searchTerm:', this.searchTerm);
    console.log('searchResults:', this.searchResults);
    this.cdr.detectChanges();
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

navigateToType(type: string) {
  this.route.navigate(['user','type', type]); // Adjust the route as needed
}

}
