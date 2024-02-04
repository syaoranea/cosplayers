import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DasboardComponent } from './views/dasboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAlbumComponent } from './pages/add-album/add-album.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddNewsComponent } from './pages/add-news/add-news.component';
import { AddCosplayerComponent } from './pages/add-cosplayer/add-cosplayer.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxEditorModule } from 'ngx-editor';
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
  },
  {
    path: 'add-cosplayer',
    component: AddCosplayerComponent,
  },

];

@NgModule({
declarations: [
  DasboardComponent,
  AddAlbumComponent,
  AddNewsComponent,
  AddCosplayerComponent
],
imports: [
  CommonModule,
  SharedModule,
  NgxEditorModule,
  ReactiveFormsModule,
  RouterModule.forChild(routes),
  NgCircleProgressModule.forRoot({
    // set defaults here
    radius: 100,
    outerStrokeWidth: 16,
    innerStrokeWidth: 8,
    outerStrokeColor: "#78C000",
    innerStrokeColor: "#C7E596",
    animationDuration: 300,
  })
]
})
export class DasboardModule { }
