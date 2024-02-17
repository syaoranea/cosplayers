import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { Album } from '../interface/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private dbPath = '/album';

  tutorialsRef: AngularFirestoreCollection<Album>;
  photoData$: Observable<Album[]>;
  cosplayerData$: BehaviorSubject<any>;
  constructor(private db: AngularFirestore, private route: Router) {
    this.tutorialsRef = db.collection(this.dbPath);
    this.cosplayerData$ = new BehaviorSubject(null);
  }


  findBySearch(value: string): Observable<Album[]> {

    return this.photoData$ = this.cosplayerData$.pipe(
      switchMap(cosplayer =>
        this.db.collection<Album>('/album', ref =>
          ref.where('nome', '==', value)).valueChanges()
      )
    );
  }

  findBySearchCosplayer(value: string): Observable<Album[]> {

    return this.photoData$ = this.cosplayerData$.pipe(
      switchMap(cosplayer =>
        this.db.collection<Album>('/album', ref =>
          ref.where('cosplayer', '==', value)).valueChanges()
      )
    );
  }

  getAll(options?: { sortField?: string; sortOrder?: 'asc' | 'desc'; limit?: number }): Observable<Album[]> {


    // Apply sorting and limiting if options are provided
  if (options) {
    if (options.sortField && options.sortOrder) {
      this.tutorialsRef.ref.orderBy(options.sortField, options.sortOrder);
    }
    if (options.limit) {
      this.tutorialsRef.ref.limit(16);
    }
  }
  this.tutorialsRef.ref.limit(16);
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

  create(tutorial: Album): any {

    return this.tutorialsRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }

}
