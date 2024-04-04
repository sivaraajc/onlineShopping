import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/cart';
import { CartService } from 'src/app/cart.service';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent {


  user: any;
  product: Product[];
  categories: string[] = [];
  type: string;
  typeResult: Product[] = [];
  typeResultUnique: string[] = [];

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private auth: ProductService,
    private ser: ProductService,
    private cart: CartService
  ) { }

  ngOnInit(): void {
    console.log('Checking authentication status...');

    this.activatedRoute.params.subscribe(params => {
      const type = params['type'];
      this.type = params['type'];


      this.userDetails();
      this.getAll();
      this.getBytype();
    });
  }

  userDetails() {
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



  getAll() {
    this.ser.getProduct().subscribe((res: Product[]) => {
      this.product = res;
      console.log(res);


    });
  }

  navigateTotype(type: string) {
    this.route.navigate(['user', 'type', type]);
  }

  navigateTocategory(category: string) {
    this.route.navigate(['user', 'category', this.type, category]);
  }


  goBuy() {

    alert("Login After Continue");

    this.route.navigate(['user', 'login']);


  }



  //Filtered Category
  getBytype() {
    this.ser.getProductBytype(this.type).subscribe((res) => {
      this.typeResult = res;
      console.log(this.typeResult);

      const uniqueCategories = new Set(res.map(product => product.category));
      this.typeResultUnique = Array.from(uniqueCategories);
      console.log(this.typeResultUnique);


    });
  }

  AddToCart(productId: number) {

    const userId = this.user.id;
    const users = { productId, userId } as Cart;

    this.cart.postCart(users).subscribe((res) => {
      alert("Item Added to Cart");

    });
  }

  gotoCartPage() {
    this.route.navigate(['user', 'cart']);

  }

  gotoBuyNow(id: number) {
    this.route.navigate(['user', 'buynow', id]);

  }


}
