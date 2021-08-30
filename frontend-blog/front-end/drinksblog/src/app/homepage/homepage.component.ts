import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  if(environment.token == ''){
    //alert('Oops! You have to log in again!')
    this.router.navigate(['/login'])
  }
  }

}
