/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user';
import { PostsService } from '../../services/posts.service';
import { IPaginated } from '../../interfaces/paginated';
import { IPosts } from '../../interfaces/posts';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { TOKEN_SESSION } from '../../const/const';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LateralMenuComponent } from '../../components/lateral-menu/lateral-menu.component';
import { NewPostsComponent } from '../../components/new-posts/new-posts.component';

@Component({
  selector: 'app-user-wall',
  standalone: true,
  templateUrl: './user-wall.component.html',
  styleUrl: './user-wall.component.scss',
  imports: [LateralMenuComponent, NewPostsComponent, InfiniteScrollModule]
})
export class UserWallComponent implements OnInit {
  constructor
    (private router: Router,
      private auth: AuthenticationService,
      private user: UserService,
      private post: PostsService) { }

  listPosts: Array<IPosts & IUser> = []
  paginated: IPaginated = {
    currentPage: 1,
    itemRange: 0,
    totalPages: 0,
  }

  User: IUser = {
    _id: "",
    fullName: "Daniel",
    email: "",
    age: 0,
    password: ""
  }
  pages: number = 1;
  likeCount: number = 0;
  _id: string = ""
  title: string = ""
  content: string = ""


  ngOnInit(): void {
    this.user.getUsers().then((resp: any) => {
      if (resp.status == 200) {
        this.User = resp.data
      }
    })
    this.onListPosts()

  }

  blankFields = () => {
    console.log('blankFields')
    this.title = ""
    this.content = ""
  }


  // Función que se ejecuta cuando se hace clic en el botón "Edit Profile"
  onEditProfileClick(): void {
    // Lógica para editar el perfil
    console.log('Editando perfil...');
  }

  // Función que se ejecuta cuando se hace clic en el botón "Logout"
  onLogoutClick(): void {
    this.auth.logOut().then((response: any) => {
      if (response.status == 200) {
        console.log('Cerrando sesión...');
        localStorage.removeItem(TOKEN_SESSION);
        this.blankFields();
        this.router.navigate(['/login']);
      }
      else {
        alert("Error: " + response.messages)
      }
    })
  }
  like(id: string) {
    this.post.likePost(id)
  }

  dislike(id: string) {
    this.post.dislikePost(id)
  }



  loadPosts(id: string) {
    const { _id, content, title } = this.listPosts.filter((post) => post?._id === id)[0]
    this._id = _id as string;
    this.title = title;
    this.content = content;
  }
  /*************** SCROLL INFINITE *****************/
  onScroll() {
    if (this.pages < this.paginated?.totalPages) {
      this.pages += 1
      this.onListPosts()

    }
  }

  onListPosts() {
    this.post.listPosts({ page: this.pages })
      .then((resp: any) => {
        if (resp) {
          this.listPosts.push(...resp)
          this.paginated = resp.pages
        }
        else {
          alert(resp.message)
        }
      })
  }
}
