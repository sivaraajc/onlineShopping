import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from './product';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  getUser(): any {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  constructor(private http: HttpClient,private route:Router) { }
  baseurl = 'http://localhost:8080/product/';

  postProduct(product:Product){
    return this.http.post<any>(`${this.baseurl}productPost`, product);
  }

  getProduct(){
    return this.http.get<any[]>(`${this.baseurl}getAllProduct`);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  deleteProduct(id:number){
    return this.http.delete<any>(`${this.baseurl}deletebyId/${id}`);
  }


  getProductById(id:number){
    return this.http.get<any>(`${this.baseurl}getById/${id}`);

  }
  

  updateProduct(id:number,product:Product){
    return this.http.put<any>(`${this.baseurl}updateById/${id}`, product);
  }


  getProductByCategory(category:string){
    return this.http.get<any[]>(`${this.baseurl}getByCategory/${category}`);

  }

  getProductBytype(type:string){
    return this.http.get<any[]>(`${this.baseurl}getBytype/${type}`);

  }

  getProductByTypeAndCategory(type:string,category:string){
    return this.http.get<any[]>(`${this.baseurl}getByTypeCategory/${type}/${category}`);

  }


  

  getproductByNameUsingFilter(productName:string){
    return this.http.get<any[]>(`${this.baseurl}getproductByNameUsingFilter/${productName}`);

  }

  


}
