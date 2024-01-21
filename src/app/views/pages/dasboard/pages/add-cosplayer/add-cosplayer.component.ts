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
    });
  }

  async onSubmit(): Promise<void> {

    const usuarioData: Usuario = {
      nome: this.usuarioForm.get('nome')?.value,
      descricao: this.usuarioForm.get('description')?.value,
      avatar: this.usuarioForm.get('avatar')?.value,
      cosplayer: this.usuarioForm.get('cosplayer')?.value,
      category: this.usuarioForm.get('category')?.value,
      instagram: this.usuarioForm.get('instagram')?.value,
      website: this.usuarioForm.get('site')?.value,
      twitter: this.usuarioForm.get('twitter')?.value,
      onlyfans: this.usuarioForm.get('onlyfans')?.value,
      patreon: this.usuarioForm.get('patreon')?.value,
      suicidegirls: this.usuarioForm.get('suicidegirls')?.value,
      tiktok: this.usuarioForm.get('tiktok')?.value,
    };

    // Adicionar dados ao Firestore
    this.firestoreService.create(usuarioData).then(() => {
      console.log('Foto adicionada com sucesso:', usuarioData);
    });
  }

}




