import { environment } from './../../../environments/environment.prod';
import { ThemeService } from './../../service/theme.service';
import { Theme } from './../../model/Theme';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from './../../service/alerts.service';

@Component({
  selector: 'app-theme-edit',
  templateUrl: './theme-edit.component.html',
  styleUrls: ['./theme-edit.component.css']
})
export class ThemeEditComponent implements OnInit {

  theme: Theme = new Theme()

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertsService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/login'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdTheme(id)
  }

  findByIdTheme(id: number){
    this.themeService.getByIdTheme(id).subscribe((resp: Theme) => {
      this.theme = resp
    })
  }

  update(){
    this.themeService.putTheme(this.theme).subscribe((resp: Theme)=>{
      this.theme = resp
      this.alert.showAlertSuccess('Theme updated!')
      this.router.navigate(['/theme'])
    })
  }

}
