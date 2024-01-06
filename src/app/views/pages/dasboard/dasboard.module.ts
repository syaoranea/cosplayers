import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasboardComponent } from './views/dasboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAlbumComponent } from './pages/add-album/add-album.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [

  {
    path: '',
    component: DasboardComponent,
  },
  {
    path: 'add-album',
    component: AddAlbumComponent,
  },

];

@NgModule({
declarations: [
  DasboardComponent,
  AddAlbumComponent
],
imports: [
  CommonModule,
  SharedModule,
  ReactiveFormsModule,
  RouterModule.forChild(routes)
]
})
export class DasboardModule { }
