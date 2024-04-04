import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-post',
  templateUrl: './product-post.component.html',
  styleUrls: ['./product-post.component.scss']
})
export class ProductPostComponent {




  goToProductPage() {

    this.route.navigate(['admin','dashboard']);
   
    }




  username: string | null = null;


  

  registrationForm: FormGroup;

  constructor(private route: Router, private fb: FormBuilder,private ser:ProductService,private auth:ProductService) {
    this.registrationForm = this.fb.group({
      productName: new FormControl('', [Validators.required]),
      productDetails: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: [null, Validators.required],
      category: new FormControl('', [Validators.required]),
     type: new FormControl('', [Validators.required])
      
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
    console.log('Checking authentication status...');
    if (this.auth.isAuthenticated()) {
      console.log('User is authenticated. Navigating to user dashboard.');
      this.route.navigate(['admin','postProduct']);
    } else {
      console.log('User is not authenticated. Navigating to login page.');
      this.route.navigate(['user', 'login']);
    }
  }
   



  initForm() {
    // Check if user is defined before initializing the form
   

    
      this.registrationForm = this.fb.group({
        productName: new FormControl('', [Validators.required]),
        productDetails: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        image: new FormControl('',[Validators.required]),
        type: new FormControl('',[Validators.required]),
        category: new FormControl('', [Validators.required])
      
       
      });
  
  }


   register() {
  
      let x=this.registrationForm.value.type;
      this.registrationForm.value.type=x.toUpperCase();

      let y=this.registrationForm.value.category;
      this.registrationForm.value.category=y.toUpperCase();
      
      const reg = this.registrationForm.value as Product
      console.log(reg);
      this.ser.postProduct(reg).subscribe((res)=>{
        console.log(res);
         
        this.route.navigate(['admin','dashboard']);
      });
     
  }

 
  

  



}
