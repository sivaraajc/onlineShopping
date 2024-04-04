import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { Car } from 'src/app/car';
import { CarService } from 'src/app/car.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string;
  userDetails: Car[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private carService: CarService

  ) { }

  ngOnInit() {
    this.getAll();

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
        ],
      ],
    });
    
  }



  login() {
    const log = this.loginForm.value as Car;
    this.carService.signin(log).subscribe(
      (res) => {
        console.log(res);

        const user = {
          id: res.id,
          username: res.name,
          age: res.age,
          mobile: res.mobile,
          gender: res.gender,
          roles: res.roles
        };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', res.token);

        if (res.roles === 'ADMIN') {
          this.carService.openSnackBarGreen("Login Success");
          this.router.navigate(['admin', 'dashboard']);
        } else if (res.roles === 'USER') {
          this.carService.openSnackBarGreen("Login Success");
          this.router.navigate(['user', 'dashboard']);
        } else {
          alert('Invalid user');
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
        this.carService.openSnackBarRed(this.errorMessage);
      }
    );
  }

  showPassword: boolean = false;
  eyeIcon: string = 'fas fa-eye-slash';

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.eyeIcon = this.showPassword ? 'fas fa-eye' : 'fas fa-eye-slash';
  }

  getAll() {
    this.carService.getAllUser().subscribe((res) => {
      this.userDetails = res;
    });
  }



  usernameExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      const username = control.value;
      const isUsernameExists = this.userDetails.some(user => user.name === username);
      console.log(isUsernameExists);
      return Promise.resolve(isUsernameExists ? { usernameExists: true } : null);
    };
  }
  
  
   
    
  }



