import { AfterViewInit, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Dados } from 'src/app/shared/interface/dados';
import { Photo } from 'src/app/shared/interface/photo';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { PhotosService } from 'src/app/shared/services/photos.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DasboardComponent implements OnInit, AfterViewInit{
  user: any;
  usuario: string;
  uniqueAlbums: Set<string> = new Set<string>();
  uniqueCosplayer: Set<string> = new Set<string>();
  photos?: Photo[];
  dados: Dados = new Dados;
  loading: boolean = false;



  constructor(
    private authService: AuthService,
    private servicePhoto: PhotosService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {

    this.iUserIn();

  }
  ngAfterViewInit() {

    this.loadingService.show();
    // Simule uma operação demorada
    /* setTimeout(() => {
      this.loadingService.hide();
      this.loading = true;
      this.onLayout();

    }, 1000); */
    setTimeout(() => {
      this.loadingService.hide();
      this.loading =true

    }, 2000);

  }

  iUserIn() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.usuario = this.user.displayName;
  }

  logOut() {
    this.authService.logOut();
  }


}
