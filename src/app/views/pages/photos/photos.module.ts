
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from '../photos/photos.component';
import { LightgalleryModule } from 'lightgallery/angular';

const routes: Routes = [

  {
    path: '',
    component: PhotosComponent,
  },
  {
    path: 'Natalino/:id',
    component: PhotosComponent,
  },

];

@NgModule({
  declarations: [ PhotosComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    LightgalleryModule
  ]
})


export class PhotosModule { }
