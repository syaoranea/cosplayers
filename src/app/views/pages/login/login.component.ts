import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formUser: FormGroup;
  //cri
  constructor(public auth: AuthService, private form: FormBuilder) {
    this.formUser = this.form.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    const { email, password } = this.formUser.value;
    console.log(email, password);
    this.auth.login(email, password);
  }

  googleLogin() {
    console.log("googleLogin")
    this.auth.googleLogin();
  }

  logout() {
    this.auth.logout();
  }
}
