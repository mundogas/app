import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { LoginComponent } from './layouts/login/login.component';
import { EsqueciSenhaComponent } from './layouts/esqueci-senha/esqueci-senha.component';
import { ResetarSenhaComponent } from './layouts/resetar-senha/resetar-senha.component';

import { AsideComponent } from './components/aside/aside.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminRoutingModule } from './layouts/admin/admin-routing.module';
import { AdminModule } from './layouts/admin/admin.module';

//Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalComponent } from './components/modal/modal.component';
import { ModalCancelarComponent } from './components/modal-cancelar/modal-cancelar.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { CadastrarComponent } from './layouts/cadastrar/cadastrar.component';
import { ContatoComponent } from './layouts/contato/contato.component';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    EsqueciSenhaComponent,
    ResetarSenhaComponent,
    ContatoComponent,
    AsideComponent,
    NavbarComponent,
    ModalComponent,
    ModalCancelarComponent,
    CadastrarComponent,
  ],
  imports: [
    BrowserModule,
    AdminRoutingModule,
    AdminModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSlideToggleModule,
    AlertModule.forRoot(),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
