import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/User';
import { Router } from '@angular/router';

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
    private router: Router
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
      alert("Minimum of 8 characters required.")
    }

    if(this.user.password != this.confirmPw){
      alert("Passwords don't match")
    } else {
      this.authService.signin(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/login'])
        alert("You're in!")
      })
    }
  }

}
