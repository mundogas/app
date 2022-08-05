import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdutosComponent } from 'src/app/pages/produtos/produtos.component';

import { ClientesComponent } from 'src/app/pages/users/clientes/clientes.component';
import { EntregadoresComponent } from 'src/app/pages/users/entregadores/entregadores.component';
import { AdministradoresComponent } from 'src/app/pages/users/administradores/administradores.component';

import { PerfilComponent } from 'src/app/pages/me/perfil/perfil.component';

import { AdminComponent } from './admin.component';
import { AuthGuard } from '../../_services/_auth/auth.service';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { CidadesComponent } from 'src/app/pages/cidades/cidades.component';
import { PedidosComponent } from 'src/app/pages/pedidos/pedidos.component';

const routes: Routes = [
  {
    path: 'administrativo',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ProdutosComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'dashboard', component: DashboardComponent },

      { path: 'clientes', component: ClientesComponent },
      { path: 'entregadores', component: EntregadoresComponent },
      { path: 'administradores', component: AdministradoresComponent },
      
      { path: 'produtos', component: ProdutosComponent },
      { path: 'cidades', component: CidadesComponent },
      { path: 'pedidos', component: PedidosComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AdminRoutingModule { }
