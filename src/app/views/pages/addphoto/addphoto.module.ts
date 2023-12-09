import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddphotoComponent } from './addphoto.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [

  {
    path: '',
    component: AddphotoComponent,
  }

];

@NgModule({
  declarations: [AddphotoComponent],
  imports: [
    CommonModule,
    SharedModule,

    RouterModule.forChild(routes)
  ]
})

export class AddPhotoModule { }
