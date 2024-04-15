import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CircleProgressOptions } from 'ng-circle-progress';
import { Observable } from 'rxjs';
import { Album } from 'src/app/shared/interface/album';
import { Photo } from 'src/app/shared/interface/photo';
import { AlbumService } from 'src/app/shared/services/album.service';
import { PhotosService } from 'src/app/shared/services/photos.service';
import { format, set } from 'date-fns';
import { ptBR } from 'date-fns/locale';
@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {
  albumForm: FormGroup;
  photos: File[] = [];
  percent: number = 0;
  options = new CircleProgressOptions();
  show: boolean = false;
  data: string;
  slug: string;
  urlImage: string;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private firestoreService: PhotosService,
    private albumService: AlbumService
    ) {
      const currentDate = new Date();
      this.data = format(currentDate, 'd MMMM yyyy', { locale: ptBR }); // 'ptBR' é o código para o idioma português do Brasil
    }

  ngOnInit(): void {
    this.albumForm = this.fb.group({
      albumName: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      cosplayer: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      class: ['', [Validators.required, Validators.maxLength(50)]],
      anime: ['', [Validators.required, Validators.maxLength(50)]],
      personagem: ['', [Validators.required, Validators.maxLength(50)]],
      banner: [''],
    });
  }

  addPhoto(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.photos = Array.from(files);
    }

  }

  onToSlug(title: string) {
   return  this.slug = title.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  async onSubmit(): Promise<void> {
    const albumName = this.albumForm.get('albumName').value;
    const description = this.albumForm.get('description').value;
    const cosplayer = this.albumForm.get('cosplayer').value;
    console.log('Nome do Cosplayer:', cosplayer);
    console.log('Nome do Álbum:', albumName);
    this.show = true;
    this.onToSlug(description);
    const albumData: Album = {
          nome: this.albumForm.get('albumName')?.value,
          cosplayer: this.albumForm.get('cosplayer')?.value,
          categoria: this.albumForm.get('category')?.value,
          class: this.albumForm.get('class')?.value,
          anime: this.albumForm.get('anime')?.value,
          personagem: this.albumForm.get('personagem')?.value,
          cosplayer_lowercase: this.albumForm.get('cosplayer').value.toLowerCase(),
          anime_lowercase: this.albumForm.get('anime').value.toLowerCase(),
          personagem_lowercase: this.albumForm.get('personagem').value.toLowerCase(),
          //imagem: this.urlImage,
          data: this.data,
          qtdImg: this.photos.length,
          slug: "-" + this.slug,

          // Adicione mais campos conforme necessário
        };
    for (let i = 0; i < this.photos.length; i++) {
      const photoName = `${albumName}_${i + 1}`;
      console.log(`Foto ${i + 1}: ${photoName}`);

      this.percent = Math.round(((i + 1) / this.photos.length) * 100);

      const photoData: Photo = {
        title: this.albumForm.get('albumName')?.value,
        description: this.albumForm.get('description')?.value || '',
        album: this.albumForm.get('albumName')?.value || '',
        cosplayer: this.albumForm.get('cosplayer')?.value || '',
        category: this.albumForm.get('category')?.value || '',
        class: this.albumForm.get('class')?.value || '',
        banner: this.albumForm.get('banner')?.value || '',
        anime: this.albumForm.get('anime')?.value || '',
        personagem: this.albumForm.get('personagem')?.value || '',
        cosplayer_lowercase: this.albumForm.get('cosplayer').value.toLowerCase(),
        anime_lowercase: this.albumForm.get('anime').value.toLowerCase(),
        personagem_lowercase: this.albumForm.get('personagem').value.toLowerCase(),
        slug: "-" + this.slug,
        updatedAt: new Date(),
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
          this.urlImage = downloadUrl;
          // Limpar o formulário ou realizar outras ações após a adição bem-sucedida
        }).catch(error => {
          console.error('Erro ao adicionar a foto:', error);
        });
      });
    }

    albumData.imagem = this.urlImage;

    setTimeout(() => {
      this.albumService.create(albumData)
      .then(() => {
        console.log('Notícia cadastrada com sucesso!');

      })
      .catch((error) => {
        console.error(error);
        alert('Erro ao cadastrar a notícia!');
      });
      this.albumForm.get('albumName')?.setValue('');
      this.albumForm.get('description')?.setValue('');
      console.log('Fotos enviadas com sucesso!');
      this.show = false;
    }, 3000);
  }
}

