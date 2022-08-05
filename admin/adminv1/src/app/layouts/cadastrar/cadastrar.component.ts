import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseService } from 'src/app/_config/response.service';
import { SessionService } from 'src/app/_services/_auth/session.service';
import { TokenService } from 'src/app/_services/_auth/token.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  //Spinner
  spinner: boolean = false;

  //Formulário
  cadastroForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sessionSrv: SessionService,
    public responseSrv: ResponseService,
    private tokenSrv: TokenService,
    private router: Router,
  ) { 
    this.cadastroForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        ]
      ],
      name: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  cadastrar () {
    //Reseta os erros até o momento
    this.responseSrv.alertResponse = [];

    //Inicia o spinner
    this.spinner = true;

    //Tratamento de erros caso o formulário esteja com algum campo vazio
    if(!this.cadastroForm.valid){
      return;
    }
    
    this.sessionSrv.register(this.cadastroForm.value).subscribe(
      (data: any) => {
        console.log(data);
        // this.sessionSrv.login(data.user, this.cadastroForm.value).subscribe(
        //   (res: any) => {
        //     this.handleResponse(res.data);
        //     this.spinner = false;
        //   },
        //   err => {
        //     console.log(err);
        //     this.spinner = false;
        //     this.responseSrv.handleErrorAuth(err, 1);
        // });

      },
      err => {
        console.log(err);
        this.spinner = false;
        this.responseSrv.handleErrorAuth(err, 1);
    });
  }

  handleResponse(data: any){
    this.tokenSrv.handle(data);

    this.router.navigate(['/administrativo/perfil']);
  }
}
