import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './layouts/cadastrar/cadastrar.component';
import { ContatoComponent } from './layouts/contato/contato.component';
import { EsqueciSenhaComponent } from './layouts/esqueci-senha/esqueci-senha.component';
import { LoginComponent } from './layouts/login/login.component';
import { ResetarSenhaComponent } from './layouts/resetar-senha/resetar-senha.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'cadastrar', component: CadastrarComponent,
  },
  {
    path: 'esqueci-senha', component: EsqueciSenhaComponent,
  },
  {
    path: 'resetar-senha', component: ResetarSenhaComponent,
  },
  {
    path: 'contato', component: ContatoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
