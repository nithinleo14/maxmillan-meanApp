import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { PostService } from './posts/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PostService]
})
export class AppComponent implements OnInit {
  constructor(private authservice: AuthService) { }
  ngOnInit() {
    this.authservice.autoAuthUser();
  }
}
