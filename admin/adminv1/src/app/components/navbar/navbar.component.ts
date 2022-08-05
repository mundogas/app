import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/_services/_auth/session.service';
import { TokenService } from 'src/app/_services/_auth/token.service';
import { environment } from 'src/environments/environment.prod';
import { AsideService } from '../aside/aside.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  image: string = '';

  constructor(
    public asideService: AsideService,
    public tokenSrv: TokenService,
    private sessionSrv: SessionService,
    private router: Router,
    public navBarSrv: NavbarService
  ) { }

  ngOnInit(): void {
    this.navBarSrv.loadImage();
    console.log(this.navBarSrv.loadImage());
  }

  logout() {
    //Remove o token no BD
    this.sessionSrv.logout().subscribe(
    res => {
      //Remove o token do storage
      this.tokenSrv.remove();

      //Manda para a tela de Login
      this.router.navigateByUrl('/');
    },
    err => {
      console.log(err);
    });
  }
}
