import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseService } from 'src/app/_config/response.service';
import { SessionService } from 'src/app/_services/_auth/session.service';
import { TokenService } from 'src/app/_services/_auth/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //Spinner
  spinner: boolean = false;

  //Formulário
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sessionSrv: SessionService,
    public responseSrv: ResponseService,
    private tokenSrv: TokenService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        ]
      ],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login () {
    //Reseta os erros até o momento
    this.responseSrv.alertResponse = [];

    //Inicia o spinner
    this.spinner = true;

    //Tratamento de erros caso o formulário esteja com algum campo vazio
    if(!this.loginForm.valid){
      return;
    }

    this.sessionSrv.verificaLogin(this.loginForm.value).subscribe(
      (data: any) => {

        this.sessionSrv.login(data.user, this.loginForm.value).subscribe(
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
      },
      err => {
        console.log(err);
        this.spinner = false;
        this.responseSrv.handleErrorAuth(err, 1);
    });
  }

  handleResponse(data: any){
    this.tokenSrv.handle(data);

    this.router.navigate(['/administrativo/dashboard']);
  }
}
