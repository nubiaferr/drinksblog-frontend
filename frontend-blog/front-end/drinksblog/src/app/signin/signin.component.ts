import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { AlertsService } from './../service/alerts.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User = new User
  confirmPw: string //armazenar input
  typeUs: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertsService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmPassword(event: any) {
    this.confirmPw = event.target.value
  }

  typeUser(event: any){
    this.typeUs = event.target.value
  }

  signin(){
    this.user.userType = this.typeUs
    

    if(this.user.password.length < 8){
      this.alert.showAlertDanger('Minimum of 8 characters required.')
    }

    if(this.user.password != this.confirmPw){
       this.alert.showAlertDanger("Passwords don't match")
    } else {
      this.authService.signin(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/login'])
         this.alert.showAlertSuccess("You're in!")
      })
    }
  }

}
