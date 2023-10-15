import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

declare var Isotope: any;
declare var $: any;

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})

export class AlbumComponent implements AfterViewInit {
  
  @ViewChild('grid') grid!: ElementRef;

  isotope: any;
  loading: boolean = false;
  filter = false;
  constructor(
    private loadingService: LoadingService,
    private el: ElementRef,
    private renderer: Renderer2
  ){}

  ngAfterViewInit() {
    this.loading =true
    this.loadingService.show();
    // Simule uma operação demorada
    setTimeout(() => {
      this.loadingService.hide();
      this.loading = true;
      this.onLayout();
    }, 1000);
  }

  onLayout(){
    const container = this.el.nativeElement;
    // Initialize Isotope with your desired options
    const iso = new Isotope(container, {
      itemSelector: '.isotope-item',
      transitionDuration: '0.5s',
      masonry: {
        columnWidth: '.grid-sizer',
        horizontalOrder: false
      }
    });
    this.isotope = new Isotope(this.grid.nativeElement);
  }

  filterElements(selector: string) {
    this.isotope.arrange({ filter: `.${selector}` });
    this.filter = true;
  }

  filterAll() {
    this.isotope.arrange({ filter: '*' });
  }

}
