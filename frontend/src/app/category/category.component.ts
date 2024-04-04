import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

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
    private ser: ProductService
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
    this.route.navigate(['category', this.type, category]);
  }

 
  goBuy() {

    alert("Login After Continue");

    this.route.navigate(['user','login']);


  }

  AddToCart() {
    alert("Login After Continue");

    this.route.navigate(['user','login']);
  
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

 


}
