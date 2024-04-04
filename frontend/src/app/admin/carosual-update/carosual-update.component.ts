import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Image } from 'src/app/image';
import { ImageService } from 'src/app/image.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-carosual-update',
  templateUrl: './carosual-update.component.html',
  styleUrls: ['./carosual-update.component.scss']
})
export class CarosualUpdateComponent implements OnInit {


  username: string | null = null;
  registrationForm: FormGroup;
  ImageResult: Image[] = [];
  id: number;

  constructor(private act: ActivatedRoute, private route: Router, private fb: FormBuilder, private ser: ProductService, private auth: ProductService, private imgSer: ImageService) {
    this.registrationForm = this.fb.group({
      image: [null, Validators.required]
    });
  }




  ngOnInit(): void {
    console.log('Checking authentication status...');

    this.act.params.subscribe(params => {
      const id = params['id'];
      this.id = params['id'];
    });
    this.getImageById();

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


  goToProductPage() {

    this.route.navigate(['admin', 'carosual']);

  }

  initForm() {
    // Check if user is defined before initializing the form



    this.registrationForm = this.fb.group({

      image: new FormControl('', [Validators.required])
    });

  }


  register() {

    // Add your registration logic here
    const reg = this.registrationForm.value as Image
    console.log(reg);
    this.imgSer.updateImageById(this.id, reg).subscribe((res) => {
      console.log(res);
      this.route.navigate(['admin', 'carosual']);
    });


  }



  getImageById() {
    this.imgSer.getImageById(this.id).subscribe((res) => {
      this.registrationForm.patchValue(res);
    })
  }




}
