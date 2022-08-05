import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/_services/_auth/token.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(
      private tokenSrv: TokenService
  ) { }

  loadImage(){
    let image = this.tokenSrv.getUser().image;
    let url = environment.API +'/storage/media/' +this.tokenSrv.getUser().image;
    image != null ? image = url : image = '';

    return image;
  }
}
