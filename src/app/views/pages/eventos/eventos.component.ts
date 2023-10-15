import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  loading: boolean = false;

  constructor(
    private loadingService: LoadingService,
  ){}

  ngOnInit(): void {
    this.loading =true
    this.loadingService.show();

    // Simule uma operação demorada
    setTimeout(() => {
      this.loadingService.hide();
      this.loading = true;

    }, 1000);
  }
}
