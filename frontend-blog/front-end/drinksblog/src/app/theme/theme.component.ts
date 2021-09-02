import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Theme } from '../model/Theme';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  theme: Theme = new Theme()
  themeList: Theme[]

  constructor(
    private router: Router,
    private themeService : ThemeService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      //alert('Oops! You have to log in again!')
      this.router.navigate(['/login'])
    }
    this.findAllTheme()
  }

  findAllTheme(){
    this.themeService.getAllTheme().subscribe((resp: Theme[]) => {
      this.themeList = resp
    })
  }

  signItUp(){
    this.themeService.postTheme(this.theme).subscribe((resp: Theme) => {
      this.theme = resp
      alert('Theme signed up')
      this.findAllTheme()
      this.theme = new Theme()
    })

  }



}
