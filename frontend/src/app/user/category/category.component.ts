import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/cart';
import { CartService } from 'src/app/cart.service';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{


  // user: any;
  // product: Product[];
  // categories: string[] = [];
  // category:string;
  // categoryResult:Product[]=[];

  // constructor(
  //   private route: Router,
  //   private activatedRoute: ActivatedRoute,
  //   private auth: ProductService,
  //   private ser: ProductService,
  //   private serv:CartService
  // ) {}

  // ngOnInit(): void {
  //   console.log('Checking authentication status...');

  //   this.activatedRoute.params.subscribe(params => {
  //     const category = params['category'];
  //     this.category = params['category'];

  //     this.userDetails();
  //     this.getAll();
  //     this.getByCategory();
  //   });
  // }

  // userDetails() {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     this.user = JSON.parse(storedUser);
  //     console.log(this.user);
  //   } else {
  //     // Handle the case when user details are not found in localStorage
  //   }
  // }

  // logout() {
  //   if (confirm('Confirm Logout')) {
  //     localStorage.removeItem('user');
  //     localStorage.removeItem('token');
  //     this.route.navigate(['']); // Navigate to a specific route after logout
  //   } else {
  //     location.reload(); // Reload the page if confirmation is canceled
  //   }
  // }

  // goToProductPage() {
  //   this.route.navigate(['admin', 'postProduct']);
  // }

  // getAll() {
  //   this.ser.getProduct().subscribe((res: Product[]) => {
  //     this.product = res;
  //     console.log(res);

  //     const uniqueCategories = new Set(res.map(product => product.category));
  //     this.categories = Array.from(uniqueCategories);
  //   });
  // }

  // navigateToCategory(category: string) {
  //   this.route.navigate(['user', 'categories', category]);
  // }



  // //Filtered Category
  // getByCategory(){
  //   this.ser.getProductByCategory(this.category).subscribe((res)=>{
  //     this.categoryResult=res;
  //   })
  // }

  // gotoBuyNow(id:number) {
  //   this.route.navigate(['user','buynow',id]);
    
  //   }

  


  //   AddToCart(productId:number) {

  //     const userId=this.user.id;
  //     const users={productId,userId} as Cart; 

  //     this.serv.postCart(users).subscribe((res)=>{
  //       alert("Item Added to Cart");
       
  //     });
  //   }

  //   gotoCartPage() {
  //     this.route.navigate(['user','cart']);

  //   }

  user: any;
  product: Product[];
  categories: string[] = [];
  category:string;
  categoryResult:Product[]=[];
  type:string;
  typeResult:Product[]=[]

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private auth: ProductService,
    private ser: ProductService,private cart:CartService
  ) {}

  ngOnInit(): void {
    console.log('Checking authentication status...');

    this.activatedRoute.params.subscribe(params => {
      const category = params['category'];
      this.category = params['category'];
      const type = params['type'];
      this.type = params['type'];


       this.userDetails();
       this.getProductByTypeAndCategory();
       this.getBytype();


    
    });
  }

  TypeAndCategory:Product[]=[];
  getProductByTypeAndCategory(){
    this.ser.getProductByTypeAndCategory(this.type,this.category).subscribe((res)=>{
      console.log(res);
      this.TypeAndCategory=res;
      const uniqueCategories = new Set(res.map(product => product.category));
      this.categories = Array.from(uniqueCategories);
      console.log(this.categories);
      
    })
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

      // const uniqueCategories = new Set(res.map(product => product.category));
      // this.categories = Array.from(uniqueCategories);
    });
  }

  navigateToCategory(category: string) {
    this.route.navigate(['user','category', this.type, category]);
  }



  

    typeResultUnique:any[]=[];
  //Filtered Category
  getBytype(){
    this.ser.getProductBytype(this.type).subscribe((res)=>{
      console.log(res);
      this.typeResult=res;

      const uniqueCategories = new Set(res.map(product => product.category));
      this.typeResultUnique = Array.from(uniqueCategories);
      console.log( this.typeResultUnique);
      
      
    });
  }

  AddToCart(productId:number) {

        const userId=this.user.id;
        const users={productId,userId} as Cart; 
  
        this.cart.postCart(users).subscribe((res)=>{
          alert("Item Added to Cart");
         
        });
      }

      gotoCartPage() {
            this.route.navigate(['user','cart']);
      
          }

            gotoBuyNow(id:number) {
    this.route.navigate(['user','buynow',id]);
    
    }


}
