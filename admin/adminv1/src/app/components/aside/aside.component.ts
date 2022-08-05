import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/_services/_auth/token.service';
import { AsideService } from './aside.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  constructor(
    public asideService: AsideService,
    public tokenSrv: TokenService
  ) { }

  ngOnInit(): void {
    
  }

}
