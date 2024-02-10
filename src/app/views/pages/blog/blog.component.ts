import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Category } from 'src/app/shared/interface/category';
import { Noticia } from 'src/app/shared/interface/noticia';
import { Photo } from 'src/app/shared/interface/photo';
import { CategoryService } from 'src/app/shared/services/category.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { NewsService } from 'src/app/shared/services/news.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  loading: boolean = false;
  news: Noticia[] = [];
  category: Category[] = [];
  recentes: Noticia[] = [];
  photos?: Photo[];
  uniqueAlbums: Set<string> = new Set<string>();

  constructor(
    private loadingService: LoadingService,
    private firestoreService: NewsService,
    private categoryService: CategoryService,

  ){}

  ngOnInit(): void {
    this.loading =true
    this.loadingService.show();

    // Simule uma operação demorada
    setTimeout(() => {
      this.loadingService.hide();
      this.loading = true;

    }, 1000);

    this.getNews();
    this.getCategory();


  }



  getNews(): void {
    this.firestoreService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      // Filtra as fotos mantendo apenas uma por álbum
      this.news = data;
      this.recentes = data.slice(0, 5);
      console.log(this.news);
    });
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
