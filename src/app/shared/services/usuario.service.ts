import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private dbPath = '/usuario';

  usuarioRef: AngularFirestoreCollection<Usuario>;

  constructor(private db: AngularFirestore) {
    this.usuarioRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Usuario> {
    return this.usuarioRef;
  }

  create(tutorial: Usuario): any {

    return this.usuarioRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.usuarioRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.usuarioRef.doc(id).delete();
  }
}
