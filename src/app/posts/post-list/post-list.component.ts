import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy{
  // posts = [
  //     {title: 'First Post!', content: 'This is the first post\s content'},
  //     {title: 'Second Post!', content: 'This is the second post\s content'},
  //     {title: 'Third Post!', content: 'This is the third post\s content'},
  // ];

  isLoading = false;
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();

    //The first argument (next) of the Observable object is called whenever a new value is received
    //Arguments order: next(), error() and complete()
    this.postsSub = this.postsService
      .getPostsUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    //Used to prevent memory leak
    this.postsSub.unsubscribe();
  }

  onDelete(postId : string){
    this.postsService.deletePost(postId);
  }
}
