import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThanksComponent } from './thanks.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: ThanksComponent }
];

@NgModule({
  declarations: [
    ThanksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ThanksModule { }
