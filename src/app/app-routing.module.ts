import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'gallery', pathMatch: 'full' },
  {path: 'gallery', loadChildren: () => import('./views/pages/gallery/gallery.module').then(m => m.GalleryModule)},
  {path: 'contact', loadChildren: () => import('./views/pages/contact/contact.module').then(m => m.ContactModule)},
  {path: 'album', loadChildren: () => import('./views/pages/album/album.module').then(m => m.AlbumModule)},
  {path: 'blog', loadChildren: () => import('./views/pages/blog/blog.module').then(m => m.BlogModule)},
  {path: 'eventos', loadChildren: () => import('./views/pages/eventos/eventos.module').then(m => m.EventosModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
