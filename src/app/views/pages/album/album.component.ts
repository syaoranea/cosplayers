import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { th } from 'date-fns/locale';
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

export class AlbumComponent implements OnInit, AfterViewInit {

  @ViewChild('grid') grid!: ElementRef;

  isotope: any;
  loading: boolean = true;
  filter = false;
  user: any;
  usuario: string;
  submitted = false;
  currentTutorial?: Photo;
  currentIndex = -1;
  title = '';

  uniqueAlbums: Set<string> = new Set<string>();

  photos?: Photo[];
  pageSize = 40;
  currentPage = 1;
  photoData: Photo = new Photo;

  constructor(
    private loadingService: LoadingService,
    private el: ElementRef,
    private authService: AuthService,
    private servicePhoto: PhotosService,
    private route: Router,
  ){}
  ngOnInit(): void {
    this.retrievePhotos();
    this.onLayout();

  }

  get totalPages(): number {
    return Math.ceil(this.photos.length / this.pageSize);
  }

  get displayedphotos(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.photos.slice(startIndex, endIndex);
  }

  onPageChanged(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
      this.loading = true;
      this.onLayout();
      this.iUserIn();
    }, 3000);
  }

  retrievePhotos(): void {
    if (this.photos) {
      console.log('Fotos já carregadas anteriormente. Não é necessário carregar novamente.');
      return;
    }
    this.servicePhoto.getAll().subscribe(data => {
      this.uniqueAlbums.clear();

      // Filtra as fotos mantendo apenas uma por álbum
      this.photos = data.filter(photo => {
        if (!this.uniqueAlbums.has(photo.album + photo.cosplayer)) {
          this.uniqueAlbums.add(photo.album + photo.cosplayer);
          return true;
        }
        return false;
      });
      /* this.loadingService.hide(); */
      this.loading = true;
      console.log(this.photos);
    },
      (error) => {
        console.error('Erro ao recuperar fotos2:', error);
        // Trate o erro conforme necessário
        // Por exemplo, exiba uma mensagem de erro para o usuário
      }
    );
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
    }, 3000);

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

  goToPhoto() {
    this.route.navigate(['/photos'])
  }

  get quantidadeItens(): number {
    return this.photos.length;
  }

}
