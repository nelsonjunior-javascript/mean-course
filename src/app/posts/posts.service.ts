import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostsUpdatedListener(){
    //As boservable return an object which we can listen
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { title: title, content: content };

    this.posts.push(post);

    //Adds a copy of the updated posts
    this.postsUpdated.next([...this.posts]);
  }
}
