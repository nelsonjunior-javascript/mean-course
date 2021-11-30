import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

  getPosts() {
    return this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post =>{
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })

    }))
    .subscribe((transformedPosts) =>{
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostsUpdatedListener(){
    //As boservable return an object which we can listen
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: null,  title: title, content: content };

    //Saves data in the backend node server
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post).subscribe(
      (responseData)=>{

        const id = responseData.postId;
        post.id = id;

        this.posts.push(post);

        //Adds a copy of the updated posts
        this.postsUpdated.next([...this.posts]);
      });


  }

  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/'+ postId).subscribe(()=>{

      console.log("Post deleted.");

      const updatedPostsAfterDelete = this.posts.filter( filterePost => filterePost.id != postId);
      this.posts = updatedPostsAfterDelete;
      this.postsUpdated.next([...this.posts]);

    });
  }

}
