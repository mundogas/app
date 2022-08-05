import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ClientesComponent } from 'src/app/pages/users/clientes/clientes.component';
import { EntregadoresComponent } from 'src/app/pages/users/entregadores/entregadores.component';
import { AdministradoresComponent } from 'src/app/pages/users/administradores/administradores.component';
import { ProdutosComponent } from 'src/app/pages/produtos/produtos.component';
import { PerfilComponent } from 'src/app/pages/me/perfil/perfil.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { CidadesComponent } from 'src/app/pages/cidades/cidades.component';
import { PedidosComponent } from 'src/app/pages/pedidos/pedidos.component';

@NgModule({
  declarations: [
    ClientesComponent,
    EntregadoresComponent,
    AdministradoresComponent,
    ProdutosComponent,
    PerfilComponent,
    DashboardComponent,
    CidadesComponent,
    PedidosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    AlertModule.forRoot(),
  ],
  providers: [
  //  { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
})
export class AdminModule { }
