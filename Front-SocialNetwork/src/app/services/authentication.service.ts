import { Injectable } from '@angular/core';
import { RequestsService } from './requests.service';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private Requests: RequestsService) { }

  register(Payload: IUser) {
    const Post = {
      Host: this.Requests.urlLocal,
      Path: '/auth/register',
      Payload: Payload,
    }
    return this.Requests.POST(Post.Host + Post.Path, Post.Payload)
  }

  logIn(Payload: { email: string, password: string }) {
    const Post = {
      Host: this.Requests.urlLocal,
      Path: "/auth/login",
      Payload: Payload
    }
    return this.Requests.POST(Post.Host + Post.Path, Post.Payload)
  }

  logOut() {
    const Post = {
      Host: this.Requests.urlLocal,
      Path: "/auth/logout",
    }
    return this.Requests.DELETE(Post.Host + Post.Path)
  }
}
