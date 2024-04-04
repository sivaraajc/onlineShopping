import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './car';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CarService {
 

 
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  baseurl = 'http://localhost:8080/jwt/';

  signup(car: Car): Observable<any> {
    return this.http.post<any>(`${this.baseurl}addUser`, car);
  }

  signin(car: any): Observable<any> {
    return this.http.post<any>( `${this.baseurl}authenticate`,car);
 }

 getAllUser(){
  return this.http.get<Car[]>(`${this.baseurl}getAllUser`)
 }

 getUserDetailsByUserName(name:string){
  return this.http.get<Car>(`${this.baseurl}getUser/${name}`)
 }

 updateRoles(id:number,car: Car){


  return this.http.put<any>( `${this.baseurl}updateRoles/${id}`,car);
 }

 

 addDefaultAdmin(car: Car): Observable<any> {
  return this.http.post<any>(`${this.baseurl}addDefaultAdmin`, car);
}


openSnackBarRed(message: string) {
  this.snackBar.open(message, "Close", {
    duration: 2000,
    panelClass: ["red-snackbar"],
    horizontalPosition: 'start',
    verticalPosition: 'top'
  });
  console.log("Snak Bar Called");

}


openSnackBarGreen(message: string) {
  this.snackBar.open(message, "Close", {
    duration: 2000,
    panelClass: ["green-snackbar"],
    horizontalPosition: 'start',
    verticalPosition: 'top'
  });
  console.log("Snak Bar Called");

}

sendVerificationString(randomString: string) {
  return this.http.get<Car[]>(`${this.baseurl}getAllUser`);
}


ForgetPassword(name: string, password: string) {
  const verifyOtp = { name, password };
  console.log(verifyOtp);


  return this.http.put<any>(`${this.baseurl}ForgetPassword`, verifyOtp);

}

}
