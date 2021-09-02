import { environment } from './../../../environments/environment.prod';
import { ThemeService } from './../../service/theme.service';
import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/model/Theme';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-theme-delete',
  templateUrl: './theme-delete.component.html',
  styleUrls: ['./theme-delete.component.css']
})
export class ThemeDeleteComponent implements OnInit {

  theme: Theme = new Theme()
  idTheme: number

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/login'])
    }

    this.idTheme = this.route.snapshot.params['id']
    this.findByIdTheme(this.idTheme)
  }

  findByIdTheme(id: number){
    this.themeService.getByIdTheme(id).subscribe((resp: Theme) => {
      this.theme = resp
    })
  }

  delete(){
    this.themeService.deleteTheme(this.idTheme).subscribe(() =>{
      alert('Theme deleted!')
      this.router.navigate(['/theme'])
    })
  }

}
