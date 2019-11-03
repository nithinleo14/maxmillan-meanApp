import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})

export class PostCreateComponent {

  enteredContent = '';
  enteredTitle = '';

  constructor(public postsService: PostService){}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.postsService.addPost(form.value.title, form.value.content);
      form.resetForm();
  }

}

}
