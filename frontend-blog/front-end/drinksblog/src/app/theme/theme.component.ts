import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Theme } from '../model/Theme';
import { ThemeService } from '../service/theme.service';
import { AlertsService } from './../service/alerts.service'

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
    private themeService : ThemeService,
    private alert: AlertsService
  ) { }

  ngOnInit() {
    if(environment.token == ''){
      //alert('Oops! You have to log in again!')
      this.router.navigate(['/login'])
    }

    if(environment.userType != 'adm'){
      this.alert.showAlertInfo('Adms only')
      this.router.navigate(['/homepage'])
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
      this.alert.showAlertSuccess('Theme signed up')
      this.findAllTheme()
      this.theme = new Theme()
    })
  }



}
