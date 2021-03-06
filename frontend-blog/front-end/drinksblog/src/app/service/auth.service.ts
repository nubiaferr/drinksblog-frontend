import { environment } from './../../environments/environment.prod';
import { UserLogin } from './../model/UserLogin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
    ) { }


  login(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://nubiaferrdrinks.herokuapp.com/users/login', userLogin)
  }

  signin(user: User): Observable<User>{
    return this.http.post<User>('https://nubiaferrdrinks.herokuapp.com/users/signin', user)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://nubiaferrdrinks.herokuapp.com/users/${id}`)
  }

  loggedin(){
    let ok = false
    if (environment.token != ''){
      ok = true
    }
    return ok
  }

  adm(){
    let ok = true
    if (environment.userType != 'adm'){
      ok = false
    }
    return ok

  }


}
