import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { User } from './../../model/User';
import { Component, OnInit } from '@angular/core';
import { AlertsService } from './../../service/alerts.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmPw: string //armazenar input
  typeUs: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertsService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if(environment.token == ''){
      //alert('Oops! You have to log in again!')
      this.router.navigate(['/login'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmPassword(event: any) {
    this.confirmPw = event.target.value
  }

  typeUser(event: any){
    this.typeUs = event.target.value
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

  update(){
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
        this.alert.showAlertSuccess("You're updated! Login again")
        environment.token = ''
        environment.name = ''
        environment.id = 0
        environment.photo = ''
      })
    }
  }

}
