import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasboardComponent } from './views/dasboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAlbumComponent } from './pages/add-album/add-album.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddNewsComponent } from './pages/add-news/add-news.component';

const routes: Routes = [

  {
    path: '',
    component: DasboardComponent,
  },
  {
    path: 'add-album',
    component: AddAlbumComponent,
  },
  {
    path: 'add-news',
    component: AddNewsComponent,
  }

];

@NgModule({
declarations: [
  DasboardComponent,
  AddAlbumComponent,
  AddNewsComponent
],
imports: [
  CommonModule,
  SharedModule,
  ReactiveFormsModule,
  RouterModule.forChild(routes)
]
})
export class DasboardModule { }
