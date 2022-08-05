import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ResponseService } from 'src/app/_config/response.service';
import { Cidade } from 'src/app/_interfaces/interfaces.service';
import { CrudService } from 'src/app/_services/crud.service';
import { TokenService } from 'src/app/_services/_auth/token.service';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidades.component.css']
})
export class CidadesComponent implements OnInit {
  //1 = Tabela, 2 = Add, 3 = Editar
  openView: Number = 1;
    
  //Formulário
  dataForm: FormGroup;
  isAtivo: boolean = true;

  //Dados
  data: any;
  empresas: any;
  //empresaID: any;
  dataGetByID: any;
  users: any;

  //Botão add user
  buttonAddUser: boolean = false;

  //Spinner
  spinner: boolean = false;

  //Table
  dataSource!: MatTableDataSource<Cidade>;
  displayed = ['nome', 'ativo', 'acoes'];
  pageSizeOptions = [5, 10];

  //Paginação
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public responseSrv: ResponseService,
    private crudSrv: CrudService,
    private tokenSrv: TokenService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { 
    this.dataForm = this.formBuilder.group({
      name: ['', Validators.required],
      ativo: ['']
    });
  }


  ngOnInit(): void {
    this.get();
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

    if(view === 3 && id != null && id != null){
      this.getByID(id);
    }

    if(view === 1){
      this.get();
      this.users = null;
    }
  }

  get() {
    this.spinner = true;

    this.crudSrv.get('cidades').subscribe(
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
    this.crudSrv.getByID('cidades', id).subscribe(
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
    
    this.dataForm.value.ativo = this.isAtivo;
    this.dataForm.value.ativo === true ? this.dataForm.value.ativo = 1 : this.dataForm.value.ativo = 0;

    this.crudSrv.post('cidades', this.dataForm.value).subscribe(
      res => {
        this.responseSrv.handleSuccess(res, 1);
       
        //Resetar o formulário
        this.dataForm.reset();
      },
      err => {
        console.log(err);
        this.responseSrv.handleErrorStatusCode(err.status, err.error, 1);
      });
  }

  update(id: number){
    //Reseta os erros até o momento
    this.responseSrv.alertResponse = [];

    this.crudSrv.update('cidades', id, this.dataForm.value).subscribe(
      res => {
        
        this.responseSrv.handleSuccess(res, 1);

        //Resetar o formulário
        this.isAtivo = true;
        this.dataForm.reset();
      },
      err => {
        console.log(err);
        this.responseSrv.handleErrorUpdate(err.error.errors, 1);
      });
  }
  
  openModalDelete(id: number){
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
    
        this.crudSrv.delete('cidades', id).subscribe(
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
