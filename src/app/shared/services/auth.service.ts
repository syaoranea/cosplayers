import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  error: any;


  constructor(private auth: AngularFireAuth) { }

  async login(email: string, password: string) {
    try {
      const credetial = await this.auth.signInWithEmailAndPassword(email, password);
     this.user = credetial.user;
     console.log("logou")
    } catch (error) {
      this.error = error;
    }
  }

  async googleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credetial = await this.auth.signInWithPopup(provider);
      this.user = credetial.user;
      console.log("logou")
    } catch (error) {
      this.error = error;
      console.log("erro", this.error)
    }
  }
    async logout() {
      await this.auth.signOut();
      this.user = null;
  }
}
