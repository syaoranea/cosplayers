import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit{
  user: any;
  usuario: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.iUserIn();
  }

  iUserIn() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.usuario = this.user.displayName;
  }

  logOut() {
    this.authService.logOut();
  }
}
