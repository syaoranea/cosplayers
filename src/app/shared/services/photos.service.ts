import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Photo } from '../interface/photo';
import { BehaviorSubject, Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private dbPath = '/photo';

  tutorialsRef: AngularFirestoreCollection<Photo>;
  photoData$: Observable<Photo[]>;
  cosplayerData$: BehaviorSubject<any>;

  constructor(private db: AngularFirestore, private route: Router) {
    this.tutorialsRef = db.collection(this.dbPath);
    this.cosplayerData$ = new BehaviorSubject(null);
  }

  getPhotos(cosplay: string, albuns?: string): Observable<Photo[]> {

    return this.photoData$ = this.cosplayerData$.pipe(
      switchMap(cosplayer =>
        this.db.collection<Photo>('/photo', ref =>
          ref.where('cosplayer', '==', cosplay).where('slug', '==', albuns)).valueChanges()
      )
    );
  }

  getAllPhotos(cosplay: string, albuns?: string): Observable<Photo[]> {

    return this.photoData$ = this.cosplayerData$.pipe(
      switchMap(cosplayer =>
        this.db.collection<Photo>('/photo', ref =>
          ref.where('cosplayer', '==', cosplay)).valueChanges()
      )
    );
  }

  getAll(options?: { sortField?: string; sortOrder?: 'asc' | 'desc'; limit?: number; cosplayer?: string; slug?:string }): Observable<Photo[]> {
    let query = this.tutorialsRef.ref;
  // Apply sorting and limiting if options are provided
  if (options) {
    if (options.sortField && options.sortOrder) {
      this.tutorialsRef.ref.orderBy(options.sortField, options.sortOrder);
    }
    if (options.limit) {
      this.tutorialsRef.ref.limit(16);
    }
    if (options.cosplayer) {
      query.where('cosplayer', '==', options.cosplayer);
      console.log('cosplayer', options.cosplayer);
    }
    if (options.slug) {
      this.tutorialsRef.ref.where('slug', '==', options.slug);
    }
  }

  return this.tutorialsRef.snapshotChanges().pipe(
      catchError(error => {
        console.error('Erro ao obter fotos:', error);
        this.route.navigate(['/error']);
        // Trate o erro conforme necessário, por exemplo, exibindo uma mensagem ao usuário
        return throwError(error);
      }),
      map(changes =>
        changes.map(c =>

          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
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
