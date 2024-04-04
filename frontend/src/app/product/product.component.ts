import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {




  product:Product[];


  constructor(private ser:ProductService,private route:Router){}

  ngOnInit(): void {

    this.getAll();
  
 
  }


  
  navbar:any[]=[];
  
    getAll(){
  
      this.ser.getProduct().subscribe((res: Product[]) => {
        this.product = res;
        console.log(res);
      
         // Assuming you want to push all unique categories into the 'navbar' array
    const uniqueCategories = new Set(res.map(product => product.category));
    this.navbar = [...this.navbar, ...Array.from(uniqueCategories)];
    this.gettypeByNav();
      });
  
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
    navigateToCategory(category: string) {
      this.route.navigate(['categories', category]); // Adjust the route as needed
    }

  goBuy() {

    alert("Login After Continue");

    this.route.navigate(['user','login']);


  }

  AddToCart() {
    alert("Login After Continue");

    this.route.navigate(['user','login']);
  
    }


    navigateToType(type: string) {
      this.route.navigate(['type', type]); // Adjust the route as needed
    }


}
