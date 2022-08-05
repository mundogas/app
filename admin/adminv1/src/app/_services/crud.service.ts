import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpOptions, httpAll } from '../_config/headers.service';
import { environment } from '../../environments/environment.prod';
import { TokenService } from './_auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private http: HttpClient,
    private tokenSrv: TokenService
  ) { }

  get(route: string) {
    let user = this.tokenSrv.getNivel();

    return this.http.get(`${environment.API}/api/${user}/${route}`, httpAll);
  }

  //Listar por ID
  getByID(route: string, id: number) {
    let user = this.tokenSrv.getNivel();

    return this.http.get(`${environment.API}/api/${user}/${route}/${id}`, httpAll);
  }

  //Criar
  post(route: string, data: any) {
    let user = this.tokenSrv.getNivel();

    return this.http.post(`${environment.API}/api/${user}/${route}`, data, httpOptions);
  }

  //Enviar Imagens
  postImage(data: any) {
    let id = this.tokenSrv.getUser().id;
    let user = this.tokenSrv.getNivel();

    return this.http.post(`${environment.API}/api/${user}/profile/${id}`, data, httpOptions);
  }

  //Atualizar
  update(route: string, id: number, data: any) {
    let user = this.tokenSrv.getNivel();

    return this.http.put(`${environment.API}/api/${user}/${route}/${id}`, data, httpOptions);
  }

  //Deletar
  delete(route: string, id: number) {
    let user = this.tokenSrv.getNivel();

    return this.http.delete(`${environment.API}/api/${user}/${route}/${id}`, httpAll);
  }

}
