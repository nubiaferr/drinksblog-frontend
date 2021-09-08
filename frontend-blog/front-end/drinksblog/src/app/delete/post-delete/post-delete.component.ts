import { Theme } from './../../model/Theme';
import { Post } from './../../model/Post';
import { environment } from './../../../environments/environment.prod';
import { ThemeService } from './../../service/theme.service';
import { PostService } from './../../service/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertsService } from './../../service/alerts.service';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {

  post: Post = new Post()
  idPost: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private alert: AlertsService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == ''){
      this.router.navigate(['/login'])
    }

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPost(this.idPost)
  }

  findByIdPost(id: number){
    this.postService.getByIdPost(id).subscribe((resp: Post) => {
      this.post = resp
    })
  }

  delete(){
    this.postService.deletePost(this.idPost).subscribe(() => {
      this.alert.showAlertSuccess('Post deleted!')
      this.router.navigate(['/homepage'])
    })
  }



}

