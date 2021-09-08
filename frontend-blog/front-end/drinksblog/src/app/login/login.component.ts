import { environment } from './../../environments/environment.prod';
import { AuthService } from './../service/auth.service';
import { UserLogin } from './../model/UserLogin';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from './../service/alerts.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin

  constructor(
    private auth: AuthService,
    private router: Router,
    private alert: AlertsService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  login(){
    this.auth.login(this.userLogin).subscribe((resp: UserLogin)=>{
      this.userLogin = resp

      //setando as infos
      environment.token = this.userLogin.token
      environment.name = this.userLogin.name
      environment.photo = this.userLogin.photo
      environment.id = this.userLogin.id
      environment.userType = this.userLogin.userType

      /*console.log(environment.token)
      console.log(environment.name)
      console.log(environment.photo)
      console.log(environment.id)*/

      this.router.navigate(['/homepage'])
    }, error => {
      if(error.status == 500){
        this.alert.showAlertDanger('Username/password: incorrect')
      }
    })
  }

}
