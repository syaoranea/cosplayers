import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Noticia } from '../interface/noticia';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private dbPath = '/noticias';

  news: AngularFirestoreCollection<Noticia>;

  constructor(private db: AngularFirestore) {
    this.news = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Noticia> {
    return this.news;
  }

  create(news: Noticia): any {

    return this.news.add({ ...news });
  }

  update(id: string, data: any): Promise<void> {
    return this.news.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.news.doc(id).delete();
  }

  getUltimosItens(): Observable<Noticia[]> {
    return this.db
      .collection<Noticia>(this.dbPath, ref => ref.orderBy('createdAt', 'desc').limit(5))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as Noticia;
            console.log(data);
            const id = action.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }


}
