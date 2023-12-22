/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-posts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-posts.component.html',
  styleUrl: './new-posts.component.scss'
})
export class NewPostsComponent {
  @Input() _id: string = "";
  @Input() title: string = "";
  @Input() content: string = "";

  @Output() cleanFields = new EventEmitter();

  constructor(private post: PostsService) { }

  clearPosts() {
    this.cleanFields.emit({
      _id: this._id = "",
      title: this.title = "",
      content: this.content = ""
    });
  }

  createPosts() {
    this.post.createPosts({ title: this.title, content: this.content })
      .then((response: any) => {
        if (response.status == 200) {
          this.clearPosts();
        }
        else {
          alert(response.message);
        }
      })
  }

  updatePosts() {
    this.post.updatePosts(this._id, { title: this.title, content: this.content })
      .then((response: any) => {
        if (response.status == 200) {
          alert('Post updated successfully');
          this.clearPosts();
        }
        else {
          alert(response.message);
        }
      })
  }

  deletePosts() {
    this.post.removePosts(this._id).then((response: any) => {
      if (response.status == 200) {
        alert('Post deleted successfully');
        this.clearPosts();
      }
      else {
        alert(response.message);
      }
    })
  }
}
