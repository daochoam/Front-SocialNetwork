import { Injectable } from '@angular/core';
import { RequestsService } from './requests.service';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private Requests: RequestsService) { }

  getUsers() {
    const Post = {
      Host: this.Requests.urlLocal,
      Path: '/user',
    }
    return this.Requests.GET(Post.Host + Post.Path)
  }

  createUser(Payload: IUser) {
    const Post = {
      Host: this.Requests.urlLocal,
      Path: '/user',
      Payload: Payload,
    }
    return this.Requests.POST(Post.Host + Post.Path, Post.Payload)
  }

  updateUser(Payload: IUser) {
    const Post = {
      Host: this.Requests.urlLocal,
      Path: `/user`,
      Payload: {
        fullName: Payload.fullName,
        password: Payload.password,
        age: Payload.age,
      },
    }
    return this.Requests.PUT(Post.Host + Post.Path, Post.Payload)
  }

  removeUser() {
    const Post = {
      Host: this.Requests.urlLocal,
      Path: `/user`,
    }
    return this.Requests.DELETE(Post.Host + Post.Path)

  }
}
