import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ResponseService } from 'src/app/_config/response.service';
import { User } from 'src/app/_interfaces/interfaces.service';
import { CrudService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-entregadores',
  templateUrl: './entregadores.component.html',
  styleUrls: ['./entregadores.component.css']
})
export class EntregadoresComponent implements OnInit {
  //1 = Tabela, 2 = Add, 3 = Editar
  openView: Number = 1;
  
  //Formulário
  dataForm: FormGroup;
  updateForm: FormGroup;
  data: any;
  dataGetByID: any;

  //Spinner
  spinner: boolean = false;

  //Table
  dataSource!: MatTableDataSource<User>;
  displayed = ['image', 'nome', 'avaliacao', 'email', 'criado', 'acoes'];
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

    this.updateForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        ]
      ],
      name: ['', Validators.required],
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
    }

    if(view === 1){
      this.get();
    }
  }

  get() {
    this.spinner = true;

    this.crudSrv.get('entregadores').subscribe(
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
  }

  getByID(id: number){
    this.crudSrv.getByID('entregadores', id).subscribe(
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

    this.crudSrv.post('entregadores', this.dataForm.value).subscribe(
      res => {
        this.responseSrv.handleSuccess(res, 1);

        //Resetar o formulário
        this.dataForm.reset();

      },
      err => {
        this.responseSrv.handleErrorStatusCode(err.status, err.error, 1);
      });
  }

  update(id: number){
    //Reseta os erros até o momento
    this.responseSrv.alertResponse = [];

    this.crudSrv.update('entregadores', id, this.updateForm.value).subscribe(
      res => {
        
        this.responseSrv.handleSuccess(res, 1);

        //Resetar o formulário
        this.updateForm.reset();
      },
      err => {
        this.responseSrv.handleErrorUpdate(err.error.errors, 1);
      });
  }

  openModalDelete(id: number){
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.crudSrv.delete('entregadores', id).subscribe(
          res => {
            this.isOpenView(1, null);
          },
          err => {
            console.log(err);
          },
        );

      }

      return;
    });
  }
}
