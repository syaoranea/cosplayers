import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';
import { ErrorComponent } from './views/pages/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
  {path: 'gallery', loadChildren: () => import('./views/pages/gallery/gallery.module').then(m => m.GalleryModule)},
  {path: 'contact', loadChildren: () => import('./views/pages/contact/contact.module').then(m => m.ContactModule)},
  {path: 'album', loadChildren: () => import('./views/pages/album/album.module').then(m => m.AlbumModule)},
  /* {path: 'blog', loadChildren: () => import('./views/pages/blog/blog.module').then(m => m.BlogModule) *//* ,  canActivate: [AuthGuard] */ /* }, */
  /* {path: 'eventos', loadChildren: () => import('./views/pages/eventos/eventos.module').then(m => m.EventosModule)}, */
  {path: 'obrigado', loadChildren: () => import('./views/pages/thanks/thanks.module').then(m => m.ThanksModule)},
 /*  {path: 'noticia/:id', loadChildren: () => import('./views/pages/news/news.module').then(m => m.NewsModule)}, */
  {path: 'login', loadChildren: () => import('./views/pages/login/login.module').then(m => m.LoginModule)},
  {path: 'addphoto',  loadChildren: () => import('./views/pages/addphoto/addphoto.module').then(m => m.AddPhotoModule) },
  {path: 'photos/:id/:cosplayer', loadChildren: () => import('./views/pages/photos/photos.module').then(m => m.PhotosModule)},
  {path: 'dasboard', loadChildren: () => import('./views/pages/dasboard/dasboard.module').then(m => m.DasboardModule), canActivate: [AuthGuard]},
  {path: 'upload', component: UploadFormComponent},
  {path: 'upload-list', component: UploadListComponent},
  {path: 'upload-details', component: UploadDetailsComponent},
  {path: 'error', component: ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
