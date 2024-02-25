import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/interface/usuario';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-add-cosplayer',
  templateUrl: './add-cosplayer.component.html',
  styleUrls: ['./add-cosplayer.component.scss']
})
export class AddCosplayerComponent {
  usuarioForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private firestoreService: UsuarioService
    ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      avatar: [''],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      cosplayer: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      site: ['', [Validators.required, Validators.maxLength(500)]],
      instagram: [''],
      twitter: [''],
      tiktok: [''],
      suicidegirls: [''],
      onlyfans: [''],
      patreon: [''],
      destaque: [''],
    });
  }

  async onSubmit(): Promise<void> {

    const usuarioData: Usuario = {
      nome: this.usuarioForm.get('nome').value || null,
      descricao: this.usuarioForm.get('description').value || null,
      avatar: this.usuarioForm.get('avatar').value || null,
      cosplayer: this.usuarioForm.get('cosplayer').value || null,
      category: this.usuarioForm.get('category').value || null,
      instagram: this.usuarioForm.get('instagram').value || null,
      website: this.usuarioForm.get('site').value || null,
      twitter: this.usuarioForm.get('twitter').value || null,
      onlyfans: this.usuarioForm.get('onlyfans').value || null,
      patreon: this.usuarioForm.get('patreon').value || null,
      suicidegirls: this.usuarioForm.get('suicidegirls').value || null,
      tiktok: this.usuarioForm.get('tiktok').value || null,
      destaque: this.usuarioForm.get('destaque').value || null,
    };

    Object.keys(usuarioData).forEach((key) => (usuarioData[key] === null || usuarioData[key] === undefined) && delete usuarioData[key]);


    // Adicionar dados ao Firestore
    this.firestoreService.create(usuarioData).then(() => {
      console.log('Foto adicionada com sucesso:', usuarioData);
    });
  }

}




