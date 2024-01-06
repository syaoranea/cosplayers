import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Category } from '../interface/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private dbPath = '/categoria-blog';

  news: AngularFirestoreCollection<Category>;

  constructor(private db: AngularFirestore) {
    this.news = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Category> {
    return this.news;
  }

  create(news: Category): any {

    return this.news.add({ ...news });
  }

  update(id: string, data: any): Promise<void> {
    return this.news.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.news.doc(id).delete();
  }
}
