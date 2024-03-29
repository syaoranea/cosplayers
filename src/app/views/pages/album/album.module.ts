

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [

  {
    path: '',
    component: AlbumComponent,
  },

];

@NgModule({
  declarations: [AlbumComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

  ]
})

export class AlbumModule { }
