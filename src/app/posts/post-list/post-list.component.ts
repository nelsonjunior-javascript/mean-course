import { Component, Input } from '@angular/core';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  // posts = [
  //     {title: 'First Post!', content: 'This is the first post\s content'},
  //     {title: 'Second Post!', content: 'This is the second post\s content'},
  //     {title: 'Third Post!', content: 'This is the third post\s content'},
  // ];

  //Adds the @input decorator in order to mae the posts property bindable outside
  //By default it is not bindable
  //We use the Input decorator because we want to bind some value from the outside (only from parent component)
  @Input() posts: Post[] = [];

  constructor(public postsService: PostsService) {}
}
