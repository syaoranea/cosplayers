import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PreloaderComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [
    PreloaderComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
