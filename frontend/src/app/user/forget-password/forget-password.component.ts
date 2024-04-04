import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/car';
import { CarService } from 'src/app/car.service';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  LoginUserName: string;
  ForgetPasswordUserDetails: Car;


  showPassword: boolean = false;
  eyeIcon: string = 'fas fa-eye-slash';
  GeneratedRandomString: string;


  userDetails: Car[] = [];
  registrationForm: FormGroup;

  verificationRequested: boolean = false;
  verificationSuccess: boolean = false;

  constructor(private fb: FormBuilder, private ser: CarService, private route: Router, private matSnak: MatSnackBar, private ord: OrderService, private act: ActivatedRoute) {
    this.registrationForm = this.createRegistrationForm();
  }

  ngOnInit(): void {
    this.getAll();
    this.LoginUserName = this.act.snapshot.params['username'];
    console.log(this.LoginUserName);
    this.getUserDetailsByUserName();
   

  }

  getUserDetailsByUserName() {
    this.ser.getUserDetailsByUserName(this.LoginUserName).subscribe((res) => {
      this.ForgetPasswordUserDetails = res;
      console.log(this.ForgetPasswordUserDetails);
      this.generateAndSendVerificationString();
      
    });
  }


  getAll() {
    this.ser.getAllUser().subscribe((res) => {
      this.userDetails = res;
    });
  }

  createRegistrationForm(): FormGroup {
    return this.fb.group({
   
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]),
    
      
      verificationCode: new FormControl('')
    });
  }

  register() {
    const reg = this.registrationForm.value as Car;
    console.log(reg);
    this.ser.ForgetPassword(this.LoginUserName,reg.password).subscribe((res)=>{
      console.log(res);
      this.ser.openSnackBarGreen("Password Updated");
      this.route.navigate(['user', 'login']);
    });
      
    
    
  }

  cancel() {
    this.route.navigate([""]);
  }

  usernameExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      const username = control.value;
      const isUsernameExists = this.userDetails.some(user => user.name === username);
      return Promise.resolve(isUsernameExists ? { usernameExists: true } : null);
    };
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    this.eyeIcon = this.showPassword ? 'fas fa-eye' : 'fas fa-eye-slash';
  }

  generateAndSendVerificationString() {
    // Generate random string
    const randomString = (Math.floor(1000000 + Math.random() * 9000000)).toString();
    console.log(randomString);

    // Update the generated random string
    this.GeneratedRandomString = randomString;

    // Send verification email
    this.ord.sendOtpVerification(this.ForgetPasswordUserDetails.email, this.GeneratedRandomString).subscribe((res) => {
      // Handle response if needed
      console.log('Verification email sent successfully');
    });

    // Update UI to show verification input box
    this.verificationRequested = true;

    // Debug statements
    console.log('Form Valid:', this.registrationForm.valid);
    console.log('Checkbox Value:', this.registrationForm.get('verificationCheckbox')?.value);
  }




  // Modify the verify() method to set verificationSuccess on successful verification
  verify() {
    const enteredCode = this.registrationForm.get('verificationCode')?.value;
    if (enteredCode === this.GeneratedRandomString) {
      this.verificationSuccess = true;
    } else {
      // Handle incorrect verification code
      this.verificationSuccess = false;
    }
  }

}
