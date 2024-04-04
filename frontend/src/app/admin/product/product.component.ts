import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
register //   });
() {
throw new Error('Method not implemented.');
}
goToProductPage() {
  this.route.navigate(['admin', 'dashboard']);
}
  id: number;
  product: Product;

  username: string | null = null;
  

  registrationForm: FormGroup;

  constructor(private route: Router,private fb: FormBuilder,private ser: ProductService,private auth: ProductService,private act: ActivatedRoute) {
    this.registrationForm = this.fb.group({
          productName: new FormControl('', [Validators.required]),
          productDetails: new FormControl('', [Validators.required]),
          price: new FormControl('', [Validators.required]),
          image: [null, Validators.required],
        });
   
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.registrationForm.patchValue({
          image: reader.result
        });
      };
    }
  }

  ngOnInit(): void {
    this.id = this.act.snapshot.params['id'];
    console.log('Checking authentication status...');
    if (this.auth.isAuthenticated()) {
      console.log('User is authenticated. Navigating to user dashboard.');
      this.route.navigate(['admin', 'product']);
    } else {
      console.log('User is not authenticated. Navigating to login page.');
      this.route.navigate(['user', 'login']);
    }
    this.userDetails();
   // this.checkingUserOrAdmin();
  
    this.getByIdproduct();
  }
  checkingUserOrAdmin(){
    if (this.auth.isAuthenticated() && this.user.roles == "ADMIN") {
      console.log('User is authenticated. Navigating to user dashboard.');
      this.route.navigate(['admin', 'dashboard']);
    } else {
      console.log('User is not authenticated. Navigating to login page.');
      this.route.navigate(['user', 'dashboard']);
    }

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



  getByIdproduct() {
    this.ser.getProductById(this.id).subscribe(
      (res) => {
        console.log('API Response:', res);

        if (res) {
          this.product = res;

          // Log the values being set to form controls
          console.log('productName:', this.product.productName);
          console.log('productDetails:', this.product.productDetails);
          console.log('price:', this.product.price);
          console.log('Image:', this.product.image);

          // Set values for each form control individually
          this.registrationForm.get('productName')?.setValue(this.product.productName || '');
          this.registrationForm.get('productDetails')?.setValue(this.product.productDetails || '');
          this.registrationForm.get('price')?.setValue(this.product.price || '');
          this.registrationForm.get('image')?.setValue(this.product.image || null);

          // Call initForm to initialize form controls based on the user object
          this.initForm();
        } else {
          console.error('No product entry found in the response.');
        }
      },
      (error) => {
        console.error('Error fetching product by ID:', error);
      }
    );
  }



  updateId() {
    if (this.registrationForm) {
      const productData = this.registrationForm.value as Product;
      console.log('product Data:', productData); // Check the form data before sending

      this.ser.updateProduct(this.id, productData).subscribe(
        (res) => {
          console.log('Post product Response:', res);
          this.route.navigate(['admin','dashboard']);
    
        },
        (error) => {
          console.error('Error posting product:', error);
        }
      );
    }
  }

  initForm() {
    // Update individual controls based on the user data
    if (this.product) {
      this.registrationForm.get('productName')?.setValue(this.product.productName);
      this.registrationForm.get('productDetails')?.setValue(this.product.productDetails);
    }
  }









}