import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {

  loading: boolean;
  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.isLoading().subscribe((v) => {
      this.loading = v;
      console.log(v);
    }
    );
  }

}
