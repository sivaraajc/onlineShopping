import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Image } from '../image';

import { CarService } from '../car.service';
import { Car } from '../car';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  ngOnInit(): void {

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.getAllimage();
    this.getAllUser();

  }

  usersInformation:Car={
    name: '',
    id: 0,
    password: '',
    age: 0,
    mobile: 0,
    gender: '',
    roles: '',
    email: '',
    otp: ''
  };

  allImage: Image[] = [];

  constructor(private imgSer: ImageService, private car: CarService) { }

  getAllimage() {
    this.imgSer.getAllImage().subscribe((res) => {
      this.allImage = res;
      console.log(this.allImage);
    });

  }

  getAllUser() {
    this.car.getAllUser().subscribe((res) => {
      let adminExists = false;
  
      for (const user of res) {
        if (user.name === 'admin') {
          adminExists = true;
          break;
        }
      }
  
      if (!adminExists) {
        this.car.addDefaultAdmin(this.usersInformation).subscribe((res) => {
          console.log("Admin Post Success");
        });
      }
    });
  }
  
}
