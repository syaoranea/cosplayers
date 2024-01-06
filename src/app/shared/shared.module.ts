import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProcurarComponent } from './components/procurar/procurar.component';
import { BlogCategoriasComponent } from './components/blog-categorias/blog-categorias.component';
import { PostsRecentesComponent } from './components/posts-recentes/posts-recentes.component';
import { TagsPopularesComponent } from './components/tags-populares/tags-populares.component';
import { PhotoStreamComponent } from './components/photo-stream/photo-stream.component';
import { InscricaoComponent } from './components/inscricao/inscricao.component';
import { LimitCharactersPipePipe } from './utils/limit-characters-pipe.pipe';



@NgModule({
  declarations: [PreloaderComponent, HeaderComponent, FooterComponent, ProcurarComponent, BlogCategoriasComponent, PostsRecentesComponent, TagsPopularesComponent, PhotoStreamComponent, InscricaoComponent, LimitCharactersPipePipe],
  imports: [CommonModule, RouterModule],
  exports: [
    PreloaderComponent,
    HeaderComponent,
    FooterComponent,
    ProcurarComponent,
    BlogCategoriasComponent,
    PostsRecentesComponent,
    TagsPopularesComponent, PhotoStreamComponent, InscricaoComponent,
    LimitCharactersPipePipe
  ]
})
export class SharedModule { }
