import  lgZoom  from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';

import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { PhotosService } from 'src/app/shared/services/photos.service';
import { Photo } from 'src/app/shared/interface/photo';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { Usuario } from 'src/app/shared/interface/usuario';

declare var Isotope: any;
declare var $: any;

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhotosComponent implements OnInit, AfterViewInit{

  @ViewChild('grid') grid!: ElementRef;
  items = [
    {
        id: '1',
        size: '1400-800',
        src: '../../../../assets/img/galeria/halfangel-013.jpg',
        thumb: '../../../../assets/img/galeria/halfangel-013.jpg',
    },
    {
        id: '2',
        size: '1400-800',
        src: '../../../../assets/img/galeria/halfangel-016.jpg',
        thumb: '../../../../assets/img/galeria/halfangel-016.jpg',
    },
];
  isotope: any;
  settings = {
    counter: false,
    plugins: [lgZoom, lgAutoplay, lgFullscreen, lgShare,lgRotate   ],
    speed: 500,
    mousewheel: true,
    preload: 4,
    appendSubHtmlTo: '.lg-outer',
    //dynamic: true,
    dynamicEl: [{
        src: '../../../../assets/img/galeria/halfangel-016.jpg',
        customProp:'abc',
    }],
    licenseKey: 'EB67CC7A-6AEA-4C6A-BD98-8307493C1577',
  };




  photos?: Photo[];
  usuario?: Usuario[];
  uniqueAlbums: Set<string> = new Set<string>();
  loading: boolean = false;
  photoAlbum: string;
  constructor(
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private servicePhoto: PhotosService,
    private el: ElementRef,
    private usuarioService: UsuarioService,
  ){}

  photoData: Photo = new Photo;

  ngAfterViewInit() {

    this.loadingService.show();
    // Simule uma operação demorada
    /* setTimeout(() => {
      this.loadingService.hide();
      this.loading = true;
      this.onLayout();

    }, 1000); */
    setTimeout(() => {
      this.loadingService.hide();
      this.loading =true

    }, 1000);

  }
  ngOnInit(): void {
    this.photoAlbum = this.route.snapshot.paramMap.get('id');
    console.log(this.photoAlbum);
    // Agora, productId contém o valor do parâmetro 'id'

    this.retrievePhotos(this.photoAlbum);
    console.log(this.usuario);
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


  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  retrievePhotos(albumId: string): void {
    this.servicePhoto.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.uniqueAlbums.clear();

      // Filtra as fotos mantendo apenas aquelas que pertencem ao álbum específico
      this.photos = data.filter(photo => {
        if (photo.album === albumId) {
          console.log(photo.cosplayer);
          this.retrieveUsuarios(photo.cosplayer);
          return true;
        }
        return false;
      });
    });



  }

  retrieveUsuarios(cosplayer: string): void {
    this.usuarioService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {

      // Filtra as fotos mantendo apenas aquelas que pertencem ao álbum específico
      this.usuario = data.filter(usuario => {
        if (usuario.cosplayer === cosplayer) {
          return true;
        }
        return false;
      });
    });
    console.log(this.usuario);

  }

  get quantidadeItens(): number {
    return this.photos.length;
  }
}
