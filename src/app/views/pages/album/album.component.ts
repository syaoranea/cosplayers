import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorService } from 'src/app/shared/components/paginator/service/paginator.service';
import { Album } from 'src/app/shared/interface/album';
import { Photo } from 'src/app/shared/interface/photo';
import { AlbumService } from 'src/app/shared/services/album.service';
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
  formSearch: FormGroup;

  uniqueAlbums: Set<string> = new Set<string>();

  album: Album[];
  pageSize: number =  40;
  currentPage = 1;
  photoData: Photo = new Photo;
  paginator: boolean = true;
  cosplayerId: string;

  constructor(
    private loadingService: LoadingService,
    private el: ElementRef,
    private authService: AuthService,
    private servicePhoto: PhotosService,
    private route: Router,
    private service: PaginatorService,
    private serviceAlbum: AlbumService,
    private fb: FormBuilder,
    private router: ActivatedRoute,
  ){}
  ngOnInit(): void {
    this.cosplayerId = this.router.snapshot.paramMap.get('cosplayer');
    if (this.cosplayerId) {
      this.serviceAlbum.findBySearchCosplayer(this.cosplayerId).subscribe(data => {
        this.album = data;
        this.loading = true;
        this.onLayout();
        this.iUserIn();
        return;
      });
    }
    this.formSearch = this.fb.group({
      search: ['']
    });
    this.retrievePhotos();
    this.onLayout();
    this.service.getPageSizeObserver().subscribe((pageSize) => {
      console.log('Tamanho da página alterado para:', pageSize);
          this.pageSize = pageSize;
        });
  }

  onPageLimit(event: any): void {
    this.paginator = false;
    this.pageSize = event.target.value;
    this.service.setPageSize(this.pageSize);
    this.loadingService.show();
    setTimeout(() => {
      //this.totalPages = Math.ceil(this.photos.length / this.pageSize);
      this.loadingService.hide();
      this.currentPage = 1;
      this.loading = true;
      this.onLayout();
      this.iUserIn();
      this.paginator = true;

    }, 3000);
  }
  get totalPages(): number {
    this.pageSize = this.service.getPageSize();
    return Math.ceil(this.album.length / this.pageSize);
  }

  get displayedphotos(): any[] {

    let startIndex: number = (this.currentPage - 1) * this.pageSize;
    let endIndex: number = startIndex + Number(this.service.getPageSize());
    return this.album.slice(startIndex, endIndex);
  }

  onPageChanged(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
      this.pageSize = this.service.getPageSize();
      this.loading = true;
      this.onLayout();
      this.iUserIn();
    }, 3000);
  }

  retrievePhotos(): void {
    this.serviceAlbum.getAll().subscribe(data => {

      // Filtra as fotos mantendo apenas uma por álbum
      this.album = data;
      /* this.loadingService.hide(); */
      this.loading = true;
      console.log(this.album);
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
    return this.album.length;
  }

  search(): void {
    this.serviceAlbum.findBySearch(this.formSearch.value.search).subscribe(data => {
      if (data.length === 0) {
        this.serviceAlbum.findBySearchCosplayer(this.formSearch.value.search).subscribe(data => {
          this.album = data;
          this.loading = true;
          this.onLayout();
          this.iUserIn();
      });

      }
      console.log('data', data);
      this.album = data;
      this.loading = true;
      this.onLayout();
      this.iUserIn();
      (error) => {
        console.error('Erro ao recuperar fotos:', error);
        // Trate o erro conforme necessário
        // Por exemplo, exiba uma mensagem de erro para o usuário
      }

    });
    console.log('Formulário enviado:', this.formSearch.value.search);
  }

}
