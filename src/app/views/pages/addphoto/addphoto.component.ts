import { Component } from '@angular/core';
import { FormBuilder,  FormControl,  FormGroup, Validators } from '@angular/forms';
import { Photo } from 'src/app/shared/interface/photo';
import { PhotosService } from 'src/app/shared/services/photos.service';

@Component({
  selector: 'app-addphoto',
  templateUrl: './addphoto.component.html',
  styleUrls: ['./addphoto.component.scss']
})
export class AddphotoComponent {
  photo: Photo = new Photo();
  submitted = false;
  formPhotos: FormGroup;

  constructor(private tutorialService: PhotosService, private form: FormBuilder) {
    this.formPhotos = this.form.group({
      title: new FormControl('aaaa', Validators.required),
      description: new FormControl('aaaa', Validators.required),
    })
  }

  savePhoto(): void {
    console.warn(this.formPhotos.value);
    setTimeout(() => {
    console.log(this.formPhotos.value);
    this.tutorialService.create(this.formPhotos.value as Photo).then(() => {
    console.log('Created new item successfully!' + this.formPhotos.value);
      this.submitted = true;
    });
  }, 2000);
  }
/*
  newPhoto(): void {
    this.submitted = false;
    this.photo = new Photo();
  } */
}
