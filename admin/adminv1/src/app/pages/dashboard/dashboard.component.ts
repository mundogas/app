import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/_services/crud.service';
import { TokenService } from 'src/app/_services/_auth/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //Dados
  dataCard: any;

  //Spinner
  spinner: boolean = false;

  constructor(
    private crudSrv: CrudService,
    private tokenSrv: TokenService,
  ) { }

  ngOnInit(): void {
    if(this.tokenSrv.getCarregamento() === 'false'){
      this.reloadCurrentPage();
    }

    this.dadosCards();
  }

  reloadCurrentPage(){
    window.location.reload();
    this.tokenSrv.setTrueCarregamento();
  }
  
  dadosCards() {
    this.spinner = true;

    this.crudSrv.get('dashboard').subscribe(
      res => {
        this.dataCard = res;

        this.spinner = false;
      },
      err => {
        console.log(err);
      });
  }

}
