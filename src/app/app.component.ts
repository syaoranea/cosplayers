import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cosplayers';
  constructor(
    private serve: AuthService
  ) { }
  ngOnInit(): void {
    this.serve.start = true;
  }


}
