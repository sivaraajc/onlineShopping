import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from 'src/app/image';
import { ImageService } from 'src/app/image.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-carosual',
  templateUrl: './carosual.component.html',
  styleUrls: ['./carosual.component.scss']
})
export class CarosualComponent implements OnInit {



  username: string | null = null;
  registrationForm: FormGroup;
  ImageResult: Image[] = [];

  constructor(private route: Router, private fb: FormBuilder, private ser: ProductService, private auth: ProductService, private imgSer: ImageService) {
    this.registrationForm = this.fb.group({
      image: [null, Validators.required]
    });
  }




  ngOnInit(): void {

    this.getAllImage();
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

    this.route.navigate(['admin', 'dashboard']);

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
    this.imgSer.postImage(reg).subscribe((res) => {
      console.log(res);
      location.reload();


    });


  }



  getAllImage() {

    this.imgSer.getAllImage().subscribe((res) => {
      this.ImageResult = res;
    })

  }


  DeleteImage(id: number) {
    this.imgSer.deleteImageById(id).subscribe((res) => {
      location.reload();
    })
  }

  UpdateImage(id: number) {


    this.route.navigate(['admin', 'carosualUpdate', id]);
  }

}
