import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/components/navbar/navbar.service';
import { ResponseService } from 'src/app/_config/response.service';
import { CrudService } from 'src/app/_services/crud.service';
import { SessionService } from 'src/app/_services/_auth/session.service';
import { TokenService } from 'src/app/_services/_auth/token.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  //1 = Tabela, 2 = Add, 3 = Editar
  openView: Number = 1;
  openFormImage: boolean = false;

  //Formulário
  dataForm: FormGroup;
  imageForm: FormGroup;
  basicForm: FormGroup;

  //Dados
  data: any;
  dataGetByID: any;
  file: any;
  image: boolean = false;

  constructor(
    public tokenSrv: TokenService,
    public responseSrv: ResponseService,
    private sessionSrv: SessionService,
    private formBuilder: FormBuilder,
    private crudSrv: CrudService,
    private navBar: NavbarService
  ) { 
    this.dataForm = this.formBuilder.group({
      current_password: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(8)]],
      password_confirmation: ['', [Validators.required, Validators.min(8)]],
    });

    this.imageForm = this.formBuilder.group({
      image: ['', Validators.required],
    });

    this.basicForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    //this.loadImage();
    this.me();
  }
  //Controle de views
  isOpenView(view: number, id: any) {
    this.openView = view;

    if(view === 3 && id != null){
      this.openView = view;
    }

    if(view === 1){
      //Início
    }
  }

  loadImage(){
    let image = this.tokenSrv.getUser().image;
   
    image != null ? this.image = true : this.image = false;
  }

  me() {
    this.sessionSrv.me().subscribe(
      (res: any) => {
        this.dataGetByID = res;

        if(this.tokenSrv.getUser().image){
          let url = environment.API +'/storage/media/' +this.tokenSrv.getUser().image;
          this.dataGetByID.image = url;
        }

      },
      err => {
        console.log(err);
      });
  }

  alterarSenha(){
    //Reseta os erros até o momento
    this.responseSrv.alertResponse = [];

    //Caso o formulário seja inválido, não vai enviar
    if(!this.dataForm.valid){
      return;
    }

    this.sessionSrv.alterarSenha(this.dataForm.value).subscribe(
      res => {
        this.responseSrv.handleSuccess(res, 2);

        //Resetar o formulário
        this.dataForm.reset();
      },
      err => {
        console.log(err);
        this.responseSrv.handleErrorStatusCode(err.status, err.error, 2);
      });
  }

  isOpenFormImage() {
    this.openFormImage = true;
  }

  isClosedFormImage() {
    this.openFormImage = false;
  }

  fileSelected(e: any){
    if(e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        //para b64
        this.file = event.target.result;
      }
    }
  }

  update() {
    //Reseta os erros até o momento
    this.responseSrv.alertResponse = [];

    //Caso o formulário seja inválido, não vai enviar
    if(!this.basicForm.valid) {
      return;
    }

    this.sessionSrv.editarPerfil(this.basicForm.value).subscribe(
      res => {
        this.responseSrv.handleSuccessPerfil(res, 1);
       
        //Resetar o formulário
        this.basicForm.reset();

        //Devolve a view com dados do perfil
        this.me();
      },
      err => {
        this.responseSrv.handleErrorUpdate(err.error.errors, 1);
    });
  }

  alterarFoto() {
    //Reseta os erros até o momento
    this.responseSrv.alertResponse = [];

    //Caso o formulário seja inválido, não vai enviar
    if(!this.imageForm.valid){
      return;
    }

    this.imageForm.value.image = this.file;

    this.crudSrv.postImage(this.imageForm.value).subscribe(
      (res: any) => {
        
        this.responseSrv.handleSuccess(res, 3);
        this.tokenSrv.setUser(res.user);
        
        //Resetar o formulário
        this.imageForm.reset();
        this.file = [];
        this.isClosedFormImage();
        this.loadImage();

        this.me();
        this.navBar.loadImage();
      },
      err => {
        
        this.responseSrv.handleErrorStatusCode(err.status, err.error, 3);
      });
  }
}
