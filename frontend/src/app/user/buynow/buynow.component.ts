import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Cart } from 'src/app/cart';
import { CartService } from 'src/app/cart.service';
import { Order } from 'src/app/order';
import { OrderService } from 'src/app/order.service';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-buynow',
  templateUrl: './buynow.component.html',
  styleUrls: ['./buynow.component.scss']
})
export class BuynowComponent {




  goBack() {
    this.route.navigate(['user', 'dashboard']);
  }



  user: any;
  carts: Product;
  DuplicateRemovedCart: Cart[];
  ProductDetails: Product[] = [];


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




  id: number;
  orderForm: FormGroup;
  order:Order={
    productId: 0,
    email: '',
    userId: 0,
    productCount: 0,
    address: '',
    amount: 0,
    mobile: 0
  };

  constructor(
    private formBuilder: FormBuilder,
    private auth: ProductService,
    private route: Router,
    private cart: CartService,
    private cdr: ChangeDetectorRef,
    private act: ActivatedRoute,
    private ord:OrderService,
    private matSnak:MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.act.snapshot.params['id']; // Initialize id here
    console.log(this.id);
    this.userDetails();

    this.getByIdDetails(); // Call getByIdDetails after id is initialized

    this.orderForm = this.formBuilder.group({
      productCount: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required]
    });
  }

  getByIdDetails() {
    console.log(this.id);

    this.auth.getProductById(this.id).subscribe((res) => {
      console.log(res);
      this.carts = res;
    });
  }



  //Get DuplicateRemovedCart Products
 
  logout() {
    if (confirm('Confirm Logout')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.route.navigate(['']); // Navigate to a specific route after logout
    } else {
      location.reload(); // Reload the page if confirmation is canceled
    }
  }


  gotoBuyNow() {
    this.route.navigate(['user', 'buynow']);

  }




  onSubmit() {
    this.order = this.orderForm.value;
    this.order.userId = this.user.id;
    this.order.productId = this.id;
    this.order.amount = this.carts.price;
  
    // Clear the form immediately
    this.orderForm.reset();
  
    // Display a message indicating that the email is being sent
    this.matSnak.open("Email Sending", 'Close', { duration: 5000 });
  
    // Send the email and process the response
    this.ord.SendEmailAndOrder(this.order).subscribe((res) => {
      console.log(res);
      this.ord.sendEmailConformation(res).subscribe((rus)=>{console.log(res);
      })
      console.log("Email sent successfully!");
      this.route.navigate(['user', 'dashboard']);
    });
  }
  
 
  

}


 








