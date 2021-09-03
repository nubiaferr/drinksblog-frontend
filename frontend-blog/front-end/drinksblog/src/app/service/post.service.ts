import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>('https://nubiaferrdrinks.herokuapp.com/posts', this.token)
  }

  getByIdPost(id: number): Observable<Post>{
    return this.http.get<Post>(`https://nubiaferrdrinks.herokuapp.com/posts/${id}`, this.token)
  }

  postPost(post: Post) : Observable<Post>{
    return this.http.post<Post>('https://nubiaferrdrinks.herokuapp.com/posts', post, this.token)
  }

  putPost(post: Post): Observable<Post>{
    return this.http.put<Post>('https://nubiaferrdrinks.herokuapp.com/posts', post, this.token)
  }

  deletePost(id: number){
    return this.http.delete('https://nubiaferrdrinks.herokuapp.com/posts', this.token)
  }
}
