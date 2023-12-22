import { Injectable } from '@angular/core';
import { RequestsService } from './requests.service';
import { IPosts } from '../interfaces/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private Requests: RequestsService) { }

  listPosts(filters: { search?: string, page?: number, itemXPage?: number }) {
    let endPoint = '/post'
    if (filters && Object.keys(filters).length) {
      Object.entries(filters).forEach(([key, value], index) => {
        if (!index) endPoint += `?${key}=${value}`
        else endPoint += `&${key}=${value}`
      })
    }
    const Post = {
      Host: this.Requests.urlLocal,
      Path: endPoint,
    }
    return this.Requests.GET(Post.Host + Post.Path)
  }

  listPostById(id: string) {
    const Post = {
      Host: this.Requests.urlLocal,
      Path: `/post/${id}`,
    }
    return this.Requests.GET(Post.Host + Post.Path)
  }

  createPosts(Payload: IPosts) {
    const Post = {
      Host: this.Requests.urlLocal,
      Path: '/post',
      Payload: {
        title: Payload.title,
        content: Payload.content
      },
    }
    return this.Requests.POST(Post.Host + Post.Path, Post.Payload)
  }

  updatePosts(id: string, Payload: IPosts) {
    const Post = {
      Host: this.Requests.urlLocal,
      Path: `/post/${id}`,
      Payload: {
        title: Payload.title,
        content: Payload.content
      },
    }
    return this.Requests.PUT(Post.Host + Post.Path, Post.Payload)
  }

  likePost(id: string) {
    const Post = {
      Host: this.Requests.urlLocal,
      Path: `/post/like/${id}`,
    }
    return this.Requests.PUT(Post.Host + Post.Path, {})
  }

  dislikePost(id: string) {
    const Post = {
      Host: this.Requests.urlLocal,
      Path: `/post/dislike/${id}`,
    }
    return this.Requests.PUT(Post.Host + Post.Path, {})
  }

  removePosts(id: string) {
    const Post = {
      Host: this.Requests.urlLocal,
      Path: `/post/${id}`,
    }
    return this.Requests.DELETE(Post.Host + Post.Path)

  }
}
