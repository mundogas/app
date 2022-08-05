import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalCancelarComponent } from 'src/app/components/modal-cancelar/modal-cancelar.component';
import { ResponseService } from 'src/app/_config/response.service';
import { Pedido } from 'src/app/_interfaces/interfaces.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  //1 = Tabela, 2 = Add, 3 = Editar, 4 = Visualizar dados
  openView: Number = 1;

  //Formulário
  dataForm: FormGroup;
  updateEntregadorForm: FormGroup;
  data: any;
  dataGetByID: any;

  //Histórico de endereços e pedidos
  enderecos: any;
  pedidos: any;
  feedbacks: any;
  entregadores: any;

  //Alert
  openError: boolean = false;
  errorMessage = '';

  //Spinner
  spinner: boolean = false;
  spinnerFeedback: boolean = false;

  //Error
  erro: any;

  //Table
  dataSource!: MatTableDataSource<Pedido>;
  displayed = ['id', 'data', 'cliente', 'entregador', 'status', 'pagamento', 'acoes'];
  pageSizeOptions = [5, 10];

  //Paginação
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public responseSrv: ResponseService,
    private crudSrv: CrudService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.dataForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        ]
      ],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(8)]],
      password_confirmation: ['', [Validators.required, Validators.min(8)]],
    });

    this.updateEntregadorForm = this.formBuilder.group({
      entregador_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //Se estiver na view de exibir, carregar admins
    if(this.openView === 1){
      this.get();
    }
  }

  //Filtro de busca
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Controle de views
  isOpenView(view: number, id: any) {
    this.openView = view;

    if(view === 3 && id != null){
      this.getByID(id);
      this.getEntregadores();
    }

    if(view === 4){
      this.getByID(id);
      this.feedbackPedido(id);
    }

    if(view === 1){
      this.get();
    }
  }

  get() {
    this.spinner = true;

    this.crudSrv.get('pedidos').subscribe(
    res => {
      this.data = res;

      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.spinner = false;
    },
    err => {
      this.responseSrv.handleErrorStatusCode(err.status, err.error, 0);
    });

    //Reseta o formulário de cadastrado
    this.dataForm.reset();
  }

  getByID(id: number){
    this.crudSrv.getByID('pedidos', id).subscribe(
      res => {
        this.dataGetByID = res;
      },
      err => {
        console.log(err);
      });
  }

  post() {
    //Reseta os erros até o momento
    this.responseSrv.alertResponse = [];

    //Caso o formulário seja inválido, não vai enviar
    if(!this.dataForm.valid){
      return;
    }

    this.crudSrv.post('pedidos', this.dataForm.value).subscribe(
      res => {
        this.responseSrv.handleSuccess(res, 1);

        //Resetar o formulário
        this.dataForm.reset();
    },
    err => {
      this.responseSrv.handleErrorStatusCode(err.status, err.error, 1);
    });
  }

  updateEntregador(id: number){
    //Reseta os erros até o momento
    this.responseSrv.alertResponse = [];

    this.crudSrv.update('alterar-entregador', id, this.updateEntregadorForm.value).subscribe(
      res => {
        this.isOpenView(1, null);
        this.responseSrv.handleSuccess(res, 2);

        //Resetar o formulário
        this.updateEntregadorForm.reset();
      },
      err => {
        this.responseSrv.handleErrorUpdate(err.error.errors, 1);
      });
  }

  openModalCancel(id: number){
    this.responseSrv.alertResponse = [];

    const dialogRef = this.dialog.open(ModalCancelarComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){

        this.crudSrv.update('pedido/status', id, {status: 'Cancelado'}).subscribe(
          res => {
            this.isOpenView(1, null);
            this.responseSrv.handleSuccess(res, 2);

          },
          err => {
            console.log(err);
          },
        );
      }

      return;
    });
  }

  feedbackPedido(id: number) {
    this.spinnerFeedback = true;

    this.crudSrv.getByID('feedback/pedidos', id).subscribe(
      (res: any) => {
        this.feedbacks = res;
        this.spinnerFeedback = false;
      },
      err => {
        if(err.error.data === null){
            this.feedbacks = null;
            this.spinnerFeedback = false;
            return;
        }
      });
  }

  getEntregadores() {
    this.crudSrv.get('entregadores').subscribe(
      res => {
        this.entregadores = res;
      },
      err => {
        console.log(err);
      });
  }
}
