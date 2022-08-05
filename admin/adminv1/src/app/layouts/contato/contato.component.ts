import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseService } from 'src/app/_config/response.service';
import { CrudService } from 'src/app/_services/crud.service';
import { TokenService } from 'src/app/_services/_auth/token.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {
  //Spinner
  spinner: boolean = false;

  //Formulário
  contatoForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private crudSrv: CrudService,
    public responseSrv: ResponseService,
    private tokenSrv: TokenService,
    private router: Router,
  ) { 
    this.contatoForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        ]
      ],
      mensagem: ['', Validators.required],
      nome: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  contato () {
    //Reseta os erros até o momento
    this.responseSrv.alertResponse = [];

    //Inicia o spinner
    this.spinner = true;

    //Tratamento de erros caso o formulário esteja com algum campo vazio
    if(!this.contatoForm.valid){
      return;
    }
    
    this.crudSrv.post('', this.contatoForm.value).subscribe(
      (res : any) => {
        this.handleResponse(res.data);
        this.spinner = false;
        console.log(res);
      },
      err => {
        console.log(err);
        this.spinner = false;
        this.responseSrv.handleErrorAuth(err, 1);
    });
  }

  handleResponse(data: any){
    this.tokenSrv.handle(data);

    this.router.navigate(['/administrativo/']);
  }
}
