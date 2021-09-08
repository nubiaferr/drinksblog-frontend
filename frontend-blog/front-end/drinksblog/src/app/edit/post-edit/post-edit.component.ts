import { ThemeService } from './../../service/theme.service';
import { Theme } from './../../model/Theme';
import { PostService } from './../../service/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from './../../model/Post';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AlertsService } from './../../service/alerts.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  post: Post = new Post()
  theme: Theme = new Theme()
  idTheme: number
  themeList: Theme[]


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private themeService: ThemeService,
    private alert: AlertsService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/login'])
    }

    let id = this.route.snapshot.params['id']
    this.findByIdPost(id)
    this.findAllThemes()
  }

  findByIdPost(id: number){
    this.postService.getByIdPost(id).subscribe((resp: Post) => {
      this.post = resp
    })
  }

  findByIdTheme(){
    this.themeService.getByIdTheme(this.idTheme).subscribe((resp: Theme) => {
      this.theme = resp
    })
  }

  findAllThemes(){
    this.themeService.getAllTheme().subscribe((resp: Theme[]) => {
      this.themeList = resp
    })
  }

  update(){
    this.theme.id = this.idTheme
    this.post.theme = this.theme

    this.postService.putPost(this.post).subscribe((resp: Post) => {
      this.post = resp
       this.alert.showAlertSuccess('Post updated!')
      this.router.navigate(['/homepage'])
    })

  }

}
