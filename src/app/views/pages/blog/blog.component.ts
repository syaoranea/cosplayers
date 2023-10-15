import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

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
