import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
declare var $: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit{
  private x = 0;
  private start: boolean = true;

  loading: boolean = false;
  speed: number = 80; // Velocidade de rolagem
  private value = 0
  constructor(
    private loadingService: LoadingService,
    private el: ElementRef,
    private serve: AuthService
    ) { }

  ngOnInit(): void {
    this.loading =true
    this.loadingService.show();

    // Simule uma operação demorada
    setTimeout(() => {
      this.loadingService.hide();
      this.loading = true;

    }, 1000);
    if(this.serve.start){
    this.getImg();
    this.serve.start = false;
  }
  }

  getImg() {
    console.log('getImg');
    let x = 0;
    setInterval(() =>{
      x-= 1;
      // Background image scrolling horisontally.
      $('.bg-image-scroll-horizontal').css('background-position', x + 'px 50%');
      // Background image scrolling vertically.
      $('.bg-image-scroll-vertical').css('background-position', '50% ' + x + 'px');
    }, 80); // Scrolling speed.
  }

}
