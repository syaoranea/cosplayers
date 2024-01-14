import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/shared/interface/photo';
import { PhotosService } from 'src/app/shared/services/photos.service';
@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {
  albumForm: FormGroup;
  photos: File[] = [];

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private firestoreService: PhotosService
    ) {}

  ngOnInit(): void {
    this.albumForm = this.fb.group({
      albumName: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      cosplayer: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  addPhoto(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.photos = Array.from(files);
    }
  }

  async onSubmit(): Promise<void> {
    const albumName = this.albumForm.get('albumName').value;
    const cosplayer = this.albumForm.get('cosplayer').value;
    console.log('Nome do Cosplayer:', cosplayer);
    console.log('Nome do Álbum:', albumName);



    for (let i = 0; i < this.photos.length; i++) {
      const photoName = `${albumName}_${i + 1}`;
      console.log(`Foto ${i + 1}: ${photoName}`);

      const photoData: Photo = {
        title: this.albumForm.get('albumName')?.value,
        description: this.albumForm.get('description')?.value || '',
        album: this.albumForm.get('albumName')?.value || '',
        cosplayer: this.albumForm.get('cosplayer')?.value || '',
        category: this.albumForm.get('category')?.value || '',
        // Adicione mais campos conforme necessário
      };

      const photoPath = `uploads/cosplayer/${cosplayer}/${albumName}/${photoName}`;
      const storageRef = this.storage.ref(photoPath);
      await storageRef.put(this.photos[i]);

      const downloadUrl$: Observable<string> = storageRef.getDownloadURL();
      downloadUrl$.subscribe(downloadUrl => {
        photoData.photoUrl = downloadUrl;

        // Adicionar dados ao Firestore
        this.firestoreService.create(photoData).then(() => {
          console.log('Foto adicionada com sucesso:', photoData);
          // Limpar o formulário ou realizar outras ações após a adição bem-sucedida
        });
      });

/*
      let irestoreData: Photo;
      irestoreData.photoUrl = await storageRef.getDownloadURL();
Type */

/*
      const firestoreData: Photo = { ...photoData, photoUrl };
      await this.firestoreService.create(firestoreData); */

    }

    console.log('Fotos enviadas com sucesso!');
  }
}

