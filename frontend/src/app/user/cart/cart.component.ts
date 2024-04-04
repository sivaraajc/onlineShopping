import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/cart';
import { CartService } from 'src/app/cart.service';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterContentChecked, AfterViewInit {



  form: FormGroup;

  constructor(
    private auth: ProductService,
    private route: Router,
    private cart: CartService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({});
  }


  ngOnInit(): void {

    this.userDetails();

    this.getByIdDetails();

    this.initializeForm();
  this.getAllCart();

  }


  user: any;
  carts: Cart[];
  DuplicateRemovedCart: Cart[];
  ProductDetails: Product[] = [];
  dataLoaded = false;



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

  getByIdDetails() {
    this.cart.getCartById(this.user.id).subscribe((res) => {
      console.log(res);
      this.carts = res;
      this.removeDuplicates();
    })

  }

  //Remove Duplicate Values
  removeDuplicates() {

    const unique = this.carts.filter((obj, index) => {
      return index === this.carts.findIndex(o => obj.productId === o.productId)
    });

    console.log(unique);
    this.DuplicateRemovedCart = unique;
    this.getProductDetails();


  }


  //Get DuplicateRemovedCart Products
  getProductDetails() {
    for (let i in this.DuplicateRemovedCart) {
      const controlName = `itemCount${i}`;
      this.form.addControl(controlName, this.fb.control(1, Validators.min(1)));

      this.auth.getProductById(this.DuplicateRemovedCart[i].productId).subscribe((res) => {
        this.ProductDetails.push(res);
        this.total.push(res.price);
        console.log(this.ProductDetails);
        this.productList();
      });
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

  gotoCartPage() {
    this.route.navigate(['user', 'cart']);

  }

  gotoBuyNow() {
    this.route.navigate(['user', 'buynow']);

  }


  //Delete Cart

  deleteCart(productId: number) {

    this.cart.deleteCart(productId, this.user.id).subscribe((res) => {
      location.reload();
    })
  }

  total: any[] = [];
  itemCount: any[] = [];
  totalAmount = 0;

  productList() {
    for (let i in this.ProductDetails) {
      this.itemCount.push(1);
      this.totalAmount += this.total[i] * this.itemCount[i];
    }

  }

  //Calculate Total Amount
  calculateSubtotal(product: Product, count: number): number {
    return product.price * count;
  }

  


  //Calculate Total Amount
  calculateTotal(): number {
    let total = 0;
    for (let i in this.ProductDetails) {
      const controlName = 'itemCount' + i;
      this.form.addControl(controlName, this.fb.control(1, Validators.min(1)));

      const itemCountValue = this.form.get(controlName)?.value || 1;

      total += this.calculateSubtotal(this.ProductDetails[i], itemCountValue);
    }

    if (total < 500 && total > 0) {
      total += 50;
    }

    return total;
  }



  ngAfterContentChecked(): void {

  }
  ngAfterViewInit(): void {

  }




  initializeForm() {
    if (this.DuplicateRemovedCart && this.DuplicateRemovedCart.length > 0) {
      const formControls: { [key: string]: any } = {};

      for (let i in this.DuplicateRemovedCart) {
        const controlName = `itemCount${i}`;
        formControls[controlName] = this.fb.control(1, Validators.min(1));
      }

      this.form = this.fb.group(formControls);
    }
  }

  updateQuantity(index: number, productIds: number): void {
    const controlName = `itemCount${index}`;
    const itemCountValue = +this.form.get(controlName)?.value || 1;  // Use + to cast to number
    console.log(itemCountValue);
  
    // Update the totalAmount for the specific product
    this.totalAmount -= this.total[index] * this.itemCount[index];
    this.itemCount[index] = itemCountValue;
    this.totalAmount += this.total[index] * this.itemCount[index];
    console.log(productIds, this.user.id, itemCountValue);
  
    this.AddtoCartUsingBackend(productIds, this.user.id, itemCountValue);
   
  }
  

  AddtoCartUsingBackend(productId:number,userId:number,itemCount:number):void {
    console.log(productId, userId, itemCount);
        this.cart.cartUpdate(productId,userId,itemCount).subscribe((res)=>{
            console.log(res);
            
        });
    }

    DefaultCart:Cart[]=[];

    getAllCart(){
      this.cart.getCart().subscribe((res)=>{
          this.DefaultCart=res;
      })
    }

















}
