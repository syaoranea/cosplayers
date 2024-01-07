import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Category } from 'src/app/shared/interface/category';
import { Noticia } from 'src/app/shared/interface/noticia';
import { Photo } from 'src/app/shared/interface/photo';
import { CategoryService } from 'src/app/shared/services/category.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { NewsService } from 'src/app/shared/services/news.service';
import { PhotosService } from 'src/app/shared/services/photos.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  newsId: string;
  loading: boolean = false;
  news: Noticia[] = [];
  category: Category[] = [];
  recentes: Noticia[] = [];
  photos?: Photo[];
  uniqueAlbums: Set<string> = new Set<string>();

  constructor(
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private firestoreService: NewsService,
    private categoryService: CategoryService,
    private servicePhoto: PhotosService,
  ){}

  ngOnInit(): void {
    this.newsId = this.route.snapshot.paramMap.get('id');
    this.loading =true
    this.loadingService.show();

    // Simule uma operação demorada
    setTimeout(() => {
      this.loadingService.hide();
      this.loading = true;

    }, 1000);
    this.retrieveNews(this.newsId);
    this.getCategory();
    this.retrievePhotos();
  }

  retrieveNews(newsId: string): void {
    this.firestoreService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {

      // Filtra as fotos mantendo apenas aquelas que pertencem ao álbum específico
      this.news = data.filter(news => {
        if (news.id === newsId) {
         console.log(news.id );
          return true;
        }
        return false;
      });
      this.recentes = data.slice(0, 5);
    });
   
    console.log(this.news);
  }

  retrievePhotos(): void {
    this.servicePhoto.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.uniqueAlbums.clear();

      // Filtra as fotos mantendo apenas uma por álbum
      this.photos = data.filter(photo => {
        if (!this.uniqueAlbums.has(photo.album)) {
          this.uniqueAlbums.add(photo.album);
          return true;
        }
        return false;
      });
    });
    this.photos = this.photos?.slice(0, 12);
  }

  getCategory(): void {
    this.categoryService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {

      // Filtra as fotos mantendo apenas uma por álbum
      this.category = data;
      console.log(this.news);
    });
  }
}
