import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { Photo } from 'src/app/shared/interface/photo';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { PhotosService } from 'src/app/shared/services/photos.service';

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
  user: any;
  usuario: string;
  submitted = false;
  currentTutorial?: Photo;
  currentIndex = -1;
  title = '';
  photos?: Photo[];
  constructor(
    private loadingService: LoadingService,
    private el: ElementRef,
    private authService: AuthService,
    private servicePhoto: PhotosService,
  ){}

  photoData: Photo = new Photo;
  ngOnInit(): void {
    this.retrievePhotos();
  }

  retrievePhotos(): void {
    this.servicePhoto.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.photos = data;
    });
  }

  refreshList(): void {
    this.currentTutorial = undefined;
    this.currentIndex = -1;
    this.retrievePhotos();
  }

  setActivePhoto(photo: Photo, index: number): void {
    this.currentTutorial = photo;
    this.currentIndex = index;
  }

  ngAfterViewInit() {
    this.loading =true
    this.loadingService.show();
    // Simule uma operação demorada
    setTimeout(() => {
      this.loadingService.hide();
      this.loading = true;
      this.onLayout();
      this.iUserIn();
    }, 1000);

  }

  iUserIn() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.usuario = this.user.displayName;
  }

  logOut() {
    this.authService.logOut();
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
