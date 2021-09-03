import { AuthService } from './../service/auth.service';
import { User } from './../model/User';
import { HttpClient } from '@angular/common/http';
import { Theme } from './../model/Theme';
import { Observable } from 'rxjs';
import { ThemeService } from './../service/theme.service';
import { PostService } from './../service/post.service';
import { Post } from './../model/Post';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  post: Post = new Post()
  postList: Post[]

  themeList: Theme[]
  idTheme: number
  theme: Theme = new Theme()

  user: User = new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private postService: PostService,
    private themeService: ThemeService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == ''){
      //alert('Oops! You have to log in again!')
      this.router.navigate(['/login'])
    }

    this.getAllTheme()
    this.getAllPosts()

    }

  //mostra todos os temas
  getAllTheme(){
    this.themeService.getAllTheme().subscribe((resp: Theme[]) => {
      this.themeList = resp
    })
  }

  //pega o id do tema
  findByIdTheme(){
    this.themeService.getByIdTheme(this.idTheme).subscribe((resp: Theme) => {
      this.theme = resp
    })
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe((resp: Post []) => {
      this.postList = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
      console.log('clicou')
    })
  }


  posts(){
    this.theme.id = this.idTheme //seta o id do tema na tabela
    this.post.theme = this.theme

    this.user.id = this.idUser //seta o id do user
    this.post.user = this.user

    this.postService.postPost(this.post).subscribe((resp: Post) => {
      this.post = resp
      alert('Posted!')
      //this.post = new Post()
      this.getAllPosts()
    })
  }

}
