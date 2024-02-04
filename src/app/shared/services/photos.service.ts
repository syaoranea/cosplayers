import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Photo } from '../interface/photo';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private dbPath = '/photo';

  tutorialsRef: AngularFirestoreCollection<Photo>;

  constructor(private db: AngularFirestore, private route: Router) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  getAll(options?: { sortField?: string; sortOrder?: 'asc' | 'desc'; limit?: number }): Observable<Photo[]> {


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
