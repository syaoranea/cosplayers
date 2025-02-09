import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference, Query } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, combineLatest, map, switchMap, throwError } from 'rxjs';
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
    this.tutorialsRef = db.collection<Album>(this.dbPath);
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
    return this.db.collection<Album>('album').snapshotChanges().pipe(
      catchError(error => {
        console.error('Erro ao obter fotos:', error);
        this.route.navigate(['/error']);
        return throwError(error);
      }),
      map(changes =>
        changes.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      ),
      map(albums => {
        console.log("Array antes da ordenação:", albums);

        const sortedAlbums = albums.sort((a, b) => {
          const dateA = this.convertStringToDate(a.data);
          const dateB = this.convertStringToDate(b.data);

          console.log(`Convertendo ${a.data} -> ${dateA}`);
          console.log(`Convertendo ${b.data} -> ${dateB}`);

          return dateB.getTime() - dateA.getTime(); // Sempre ordenar do mais recente para o mais antigo
        });

        console.log("Array depois da ordenação:", sortedAlbums);
        return sortedAlbums;
      })
    );
  }

   convertStringToDate(dateStr: string): Date {
    const months: { [key: string]: number } = {
      "janeiro": 0, "fevereiro": 1, "março": 2, "abril": 3,
      "maio": 4, "junho": 5, "julho": 6, "agosto": 7,
      "setembro": 8, "outubro": 9, "novembro": 10, "dezembro": 11
    };

    const parts = dateStr.toLowerCase().split(" ");
    if (parts.length !== 3) {
      console.error("Formato de data inválido:", dateStr);
      return new Date(0); // Retorna uma data inválida para evitar erros
    }

    const day = parseInt(parts[0], 10);
    const month = months[parts[1]];
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      console.error("Erro ao converter data:", dateStr);
      return new Date(0);
    }

    return new Date(year, month, day);
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

  searchItems(query: string): Observable<any[]> {
    const fields = ['cosplayer', 'nome', 'anime', 'personagem'];
    const queries = fields.map(field =>
      this.db.collection('/album', ref => ref.where(field, '==', query)).valueChanges({ idField: 'docId' })
    );

    return combineLatest(queries).pipe(
      map(arrays => arrays.reduce((acc, cur) => acc.concat(cur), [])),
      map(items => {
        const uniqueIds = new Set();
        const uniqueItems = [];
        items.forEach(item => {
          if (!uniqueIds.has(item.docId)) {
            uniqueIds.add(item.docId);
            uniqueItems.push(item);
          }
        });
        return uniqueItems;
      })
    );
  }


}
