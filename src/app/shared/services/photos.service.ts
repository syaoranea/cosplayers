import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Photo } from '../interface/photo';
@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private dbPath = '/photo';

  tutorialsRef: AngularFirestoreCollection<Photo>;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Photo> {
    return this.tutorialsRef;
  }

  create(tutorial: Photo): any {

    return this.tutorialsRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }

}
