import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: 'First Post', content: "This is the first post's content"},
  //   {title: 'Second Post', content: "This is the second post's content"},
  //   {title: 'Third Post', content: "This is the third post's content"},
  // ]

  posts: Post[] = [];

  private postSub: Subscription;



  constructor(public postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts();
    this.postSub = this.postService.getPostsUpdatedListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string){
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
