import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ResponseService } from 'src/app/_config/response.service';
import { Produto, ProdutoCidade, ProdutoCidadeUpdate, ViewCidade } from 'src/app/_interfaces/interfaces.service';
import { CrudService } from 'src/app/_services/crud.service';
import { TokenService } from 'src/app/_services/_auth/token.service';
import {add} from "ngx-bootstrap/chronos";

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  //1 = Tabela, 2 = Add, 3 = Editar
  openView: Number = 1;

  //Formulário
  dataForm: FormGroup;
  isPromotion: boolean = false;
  isAtivo: boolean = true;

  //Preços
  selectCidade: boolean = false;
  selectCidadeUpdate: boolean = false;
  cidadeArray: Array<ViewCidade> = [];
  produtoCidade: Array<ProdutoCidade> = [];
  produtoCidadeUpdate: Array<ProdutoCidadeUpdate> = [];
  viewTableProduto: boolean = false;
  disabledButtonEnviar: boolean = true;
  disabledButtonUpdate: boolean = true;

  //Dados
  data: any;
  empresas: any;
  dataGetByID: any;
  users: any;
  cidades: any;
  cidadeInitial: string = '';
  salePriceInitial: string = '';
  discountPriceInitial: string = '';

  //Botão add user
  buttonAddUser: boolean = false;

  //Spinner
  spinner: boolean = false;

  //Table
  dataSource!: MatTableDataSource<Produto>;
  displayed = ['nome', 'cidades', 'ativo', 'acoes'];
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
      produto_id: [''],
      cidade_id: [''],
      sale_price: [''],
      discount_price: [''],
      promotion: [''],
      ativo: ['', Validators.required]
    });
    //
    // this.updateForm = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   cidades: [''],
    //   ativo: ['', Validators.required]
    // });
  }

  ngOnInit(): void {
    if(this.tokenSrv.getCarregamento() === 'true'){
      //Carrega obras
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
    this.dataForm.reset();
    this.produtoCidade = [];
    this.produtoCidadeUpdate = [];
    this.cidadeArray = [];
    this.responseSrv.alertResponse = [];

    if(view === 3 && id != null){
      this.getByID(id);
      this.getCidades();
    }

    if(view === 2){
      this.getCidades();
    }

    if(view === 1){
      this.get();
      this.users = null;
    }
  }

  get() {
    this.spinner = true;

    this.crudSrv.get('produtos').subscribe(
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

  getCidades() {
    this.crudSrv.get('cidades').subscribe(
      res => {
        this.cidades = res;
      },
      err => {
        this.responseSrv.handleErrorStatusCode(err.status, err.error, 0);
    });
  }

  getByID(id: number){
    this.crudSrv.getByID('produtos', id).subscribe(
      (res: any) => {
        this.dataGetByID = res;
        if(res.cidades.length <= 0){
          this.disabledButtonUpdate = true;
        }

        res.cidades.forEach((cidade: any) =>{
          let add = {
            cidade_id: cidade.cidade_id,
            cidade_name: cidade.cidade.name,
            sale_price: cidade.sale_price,
            discount_price: cidade.discount_price,
            promotion:  cidade.promotion,
            id: cidade.id,
            open: false,
          };

          //Adicionar produto
          this.produtoCidadeUpdate.push(add);
          this.disabledButtonUpdate = false;
        })

        this.viewTableProduto = true;
      },
      err => {
        console.log(err);
      });
  }

  post() {
    //Reseta os erros até o momento
    this.responseSrv.alertResponse = [];

    //Caso o formulário seja inválido, não vai enviar
    // if(!this.dataForm.valid){
    //   return;
    // }

    let add = {
      cidades: this.produtoCidade,
      name: this.dataForm.value.name,
      ativo: this.dataForm.value.ativo === true ? this.dataForm.value.ativo = 1 : this.dataForm.value.ativo = 0
    }

    this.crudSrv.post('produtos', add).subscribe(
      res => {
        this.responseSrv.handleSuccess(res, 2);
        this.isOpenView(1, null);

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

    if(!this.dataForm.value.name || !this.produtoCidadeUpdate){
      return;
    }

    let update = {
      name: this.dataForm.value.name,
      ativo: this.dataForm.value.ativo === true ? this.dataForm.value.ativo = 1 : this.dataForm.value.ativo = 0,
      cidades: this.produtoCidadeUpdate,
    }

    this.crudSrv.update('produtos', id, update).subscribe(
      res => {
        this.responseSrv.handleSuccess(res, 2);
        this.isOpenView(1, null);

        //Resetar o formulário
        this.isAtivo = true;
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

        this.crudSrv.delete('produtos', id).subscribe(
          res => {
            this.responseSrv.handleSuccess(res, 2);
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

  adicionarCidadePreco(type: string) {console.log(type)
    if((!this.dataForm.value.cidade_id || !this.dataForm.value.sale_price || !this.dataForm.value.discount_price) && this.cidadeArray.length > 0){
      return;
    }

    if(type === 'post') {
      if(this.dataForm.value.cidade_id && this.dataForm.value.sale_price && this.dataForm.value.discount_price && this.produtoCidade.length <= 0){
        return
      }

      this.selectCidade = true;
    }

    if(type === 'update') {
      if(this.cidadeArray.length > 0){
        return;
      }

      if(this.dataForm.value.cidade_id && this.dataForm.value.sale_price && this.dataForm.value.discount_price && this.produtoCidadeUpdate.length <= 0){
        return
      }

      this.selectCidadeUpdate = true;
    }

    let add = {
      disabled: true,
    };

    this.cidadeArray.push(add);
  }

  removerCidadePreco(i: number){
    this.cidadeInitial = '';
    this.salePriceInitial = '';
    this.discountPriceInitial = '';
    this.cidadeArray.splice(i, 1);

    if(this.produtoCidadeUpdate.length > 0){
      this.produtoCidadeUpdate.forEach((item: any) => {
        item.open = false;
      });
    }
  }

  //Ativar os inputs
  ativarInputCidade(i: number){
    if(this.cidadeArray.length){
      this.cidadeArray[i].disabled = false;
    }
  }

  addProdutoCidadePost(i: number) {
    if(!this.dataForm.value.cidade_id || !this.dataForm.value.sale_price || !this.dataForm.value.discount_price){
      alert('Insira todas as informações antes de cadastrar.');
      return;
    }

    this.dataForm.value.promotion === true ? this.dataForm.value.promotion = 1 : this.dataForm.value.promotion = 0;

    let cidade = this.dataForm.value.cidade_id.split('-');

    let add = {
      cidade_id: cidade[0],
      cidade_name: cidade[1],
      sale_price: this.dataForm.value.sale_price,
      discount_price: this.dataForm.value.discount_price,
      promotion:  this.dataForm.value.promotion
    };

    //Adicionar produto
    this.produtoCidade.push(add);

    //Resetando o formulário
    this.cidadeInitial = '';
    this.salePriceInitial = '';
    this.discountPriceInitial = '';

    //Deletando os dados anteriores
    this.cidadeArray.splice(i, 1);

    //Exibir a tabela dos adicionados
    this.viewTableProduto = true;

    this.ativarButtonSubmitPost();
  }

  removerProdutoCidadePost(i: number){
    this.produtoCidade.splice(i, 1);

    //Se remover o último, desabilitar o botão
    if(this.produtoCidade.length <= 0){
      this.disabledButtonEnviar = true;
    }
  }

  ativarButtonSubmitPost(){
    //Ativar o botão
    if(this.dataForm.value.name !== null && this.dataForm.value.name !== '' && this.produtoCidade.length > 0){
      this.disabledButtonEnviar = false;
    }
  }

  editProdutoCidadeUpdate(id: number, index: number) {
    if(this.cidadeArray.length > 0){
      this.produtoCidadeUpdate.forEach((item: any) => {
        item.open = false;
      });
    }

    this.cidadeArray = [];

    this.crudSrv.getByID('produtos-cidades', id).subscribe(
      (res: any) => {
        this.dataGetByID.cidades = res;

        this.cidadeInitial = res.cidade_id + '-' + res.cidade.name;
        this.salePriceInitial = res.sale_price;
        this.discountPriceInitial = res.discount_price;

        this.produtoCidadeUpdate[index].open = true;
        this.selectCidadeUpdate = true;

        let add = {
          disabled: true,
        };

        this.cidadeArray.push(add);
      },
      err => {
        console.log(err);
      });

  }

  addProdutoCidadeUpdate(id: number, index: number) {console.log(id, index)
    if(!this.dataForm.value.cidade_id || !this.dataForm.value.sale_price || !this.dataForm.value.discount_price){
      alert('Insira todas as informações antes de cadastrar.');
      return;
    }

    let cidade = this.dataForm.value.cidade_id.split('-');

    let update = {
      produto_id: id,
      cidade_id: cidade[0],
      discount_price: this.dataForm.value.discount_price,
      sale_price: this.dataForm.value.sale_price,
      promotion: this.dataForm.value.promotion === true ? this.dataForm.value.promotion = 1 : this.dataForm.value.promotion = 0
    }

    this.crudSrv.update('produtos-cidades', this.produtoCidadeUpdate[index].id,  update).subscribe(
      (res: any) => {console.log(res)
        this.produtoCidadeUpdate[index].cidade_id = res.data.cidade_id;
        this.produtoCidadeUpdate[index].cidade_name = cidade[1];
        this.produtoCidadeUpdate[index].sale_price = res.data.sale_price;
        this.produtoCidadeUpdate[index].discount_price = res.data.discount_price;
        this.produtoCidadeUpdate[index].promotion = res.data.promotion;
        this.produtoCidadeUpdate[index].open = false;

        //Resetando o formulário
        this.cidadeInitial = '';
        this.salePriceInitial = '';
        this.discountPriceInitial = '';

        //Deletando os dados anteriores
        this.cidadeArray.splice(index, 1);

        //Exibir a tabela dos adicionados
        this.viewTableProduto = true;

        this.ativarButtonSubmitUpdate();
      },
      err => {
        console.log(err);
        this.responseSrv.handleErrorStatusCode(err.status, err.error, 1);
      });
  }

  removerProdutoCidadeUpdate(i: number){
    this.produtoCidadeUpdate.splice(i, 1);

    //Se remover o último, desabilitar o botão
    if(this.produtoCidadeUpdate.length <= 0){
      this.disabledButtonUpdate = true;
    }
  }

  fecharViewProdutoUpdate(id: number, index: number){
    this.produtoCidadeUpdate[index].open = false;
    this.selectCidadeUpdate = false;
    this.cidadeArray = [];
  }

  ativarButtonSubmitUpdate(){
    //Ativar o botão
    if(this.dataForm.value.name !== null && this.dataForm.value.name !== '' && this.produtoCidadeUpdate.length > 0){
      this.disabledButtonUpdate = false;
    }
  }

  openModalDeleteProdutoCidade(id: number, index: number){
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){

        this.crudSrv.delete('produtos-cidades', id).subscribe(
          res => {
            this.responseSrv.handleSuccess(res, 2);
            //this.isOpenView(1, null);
            this.removerProdutoCidadeUpdate(index);
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
