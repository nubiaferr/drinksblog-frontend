import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  name = environment.name
  photo = environment.photo
  id = environment.id


  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(){
  }

  logout(){
    this.router.navigate(['login'])
    environment.token = ''
    environment.name = ''
    environment.id = 0
    environment.photo = ''
  }

}
