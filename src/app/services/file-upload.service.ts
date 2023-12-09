import { Injectable } from '@angular/core';
import { AngularFireList  } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';
import { Photo } from '../shared/interface/photo';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = 'uploads/';
  private dbPath = 'photo';
  photoRef: AngularFirestoreCollection<Photo>;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage) {
       this.photoRef = db.collection(this.dbPath);
     }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): any {
    const photo: Photo = {
      name: fileUpload.name,
      url: fileUpload.url
    };
    return this.photoRef.add({ ...photo });
  }

/*   getFiles(): AngularFirestoreCollection<FileUpload> {
    return this.photoRef;
  } */

  deleteFile(fileUpload: FileUpload): void {
    /* this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error)); */
  }
/*
  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  } */

  private deleteFileStorage(name: string): void {
   /*  const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete(); */
  }
}
