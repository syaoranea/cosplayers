import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from 'src/app/shared/services/news.service';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  sucess: boolean = false;
  message: string = '';
  data: string = '';

  editor: Editor;
  html = '';




  constructor(
    private fb: FormBuilder,
    private firestoreService: NewsService
  ) {
    const currentDate = new Date();
    this.data = format(currentDate, 'd MMMM yyyy', { locale: ptBR }); // 'ptBR' é o código para o idioma português do Brasil
  }
  ngOnInit(): void {
    this.editor = new Editor();
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      photoUrl: ['', [Validators.required]],
      autor: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      createdAt: [this.data, [Validators.required]],
      slug: [''],
    });
    console.log(this.data);

  }

  onToSlug(title: string): void {
    const slug = title.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
    this.form.get('slug')?.setValue(slug);
  }

  onSubmit(): void {
    this.onToSlug(this.form.get('title')?.value);
    this.form.get('description')?.setValue(this.html);
    this.firestoreService.create(this.form.value)
      .then(() => {
        console.log('Notícia cadastrada com sucesso!');
        this.message = this.form.get('description')?.value;
        this.form.reset();
        this.sucess = true;
      })
      .catch((error) => {
        console.error(error);
        alert('Erro ao cadastrar a notícia!');
      });
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
