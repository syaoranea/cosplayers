import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBcprOtudni8ZOsmGDckoXWwYlUhPVa99k",
      authDomain: "cosplayers-62594.firebaseapp.com",
      databaseURL: "https://cosplayers-62594-default-rtdb.firebaseio.com",
      projectId: "cosplayers-62594",
      storageBucket: "cosplayers-62594.appspot.com",
      messagingSenderId: "96313580116",
      appId: "1:96313580116:web:0476762407212d55e46bc1"}),
      AngularFireDatabaseModule,
      AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
