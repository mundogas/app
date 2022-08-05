import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpOptions, httpAll } from '../../_config/headers.service';
import { TokenService } from './token.service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

    constructor(
        private http: HttpClient,
        private tokenSrv: TokenService,
    ) {}

    //Verificação de usuário
    verificaLogin(data: any) {
        return this.http.post(`${environment.API}/api/auth/users`, data);
    }

    //Login
    login(user: string, data: any) {
        return this.http.post(`${environment.API}/api/auth/${user}/login`, data);
    }

    //Registrar
    register(data: any) {
        return this.http.post(`${environment.API}/api/auth/empresa/register`, data);
    }

    //Meu Perfil
    me() {
        let id = this.tokenSrv.getUser().id;
        let user = this.tokenSrv.getNivel();

        return this.http.get(`${environment.API}/api/${user}/me/${id}`, httpAll);
    }

    //Alterar dados de usuário
    editarPerfil(data: any) {
        let id = this.tokenSrv.getUser().id;
        let user = this.tokenSrv.getNivel();

        return this.http.put(`${environment.API}/api/${user}/editar-perfil/${id}`, data, httpOptions);
    }

    //Alterar Senha
    alterarSenha(data: any) {
        let id = this.tokenSrv.getUser().id;
        let user = this.tokenSrv.getNivel();

        return this.http.put(`${environment.API}/api/${user}/alterar-senha/${id}`, data, httpOptions);
    }

    logout() {
        let id = this.tokenSrv.getUser().id;
        let user = this.tokenSrv.getNivel();

        return this.http.post(`${environment.API}/api/auth/${user}/logout/${id}`, '', httpAll);
    }

    getAdmins() {
        let id = this.tokenSrv.getUser().id;

        return this.http.get(`${environment.API}/api/admin/listAdmins/${id}`, httpAll);
    }
}
