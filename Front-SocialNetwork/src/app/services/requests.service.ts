import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SOCIALNETWORK_BACK } from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient, private router: Router) { }

  public urlLocal: string = URL_SOCIALNETWORK_BACK

  private handleRedirect(res: any): void {
    if (res.redireccion === true) {
      this.router.navigate(['/']);
    }
  }

  GET(url: string) {
    let promise = new Promise((resolve, reject) => {
      this.http.get(url)
        .toPromise()
        .then((res: any) => {
          this.handleRedirect(res);
          resolve(res);
        })
    });
    return promise;
  }

  POST(url: string, data: {}) {
    let promise = new Promise((resolve, reject) => {
      this.http.post(url, data)
        .toPromise()
        .then((res: any) => {
          this.handleRedirect(res);
          resolve(res);
        })
    });
    return promise;
  }

  PUT(url: string, data: {}) {
    let promise = new Promise((resolve, reject) => {
      this.http.put(url, data)
        .toPromise()
        .then((res: any) => {
          this.handleRedirect(res);
          resolve(res);
        })
    });
    return promise;
  }

  DELETE(url: string) {
    let promise = new Promise((resolve, reject) => {
      this.http.delete(url)
        .toPromise()
        .then((res: any) => {
          this.handleRedirect(res);
          resolve(res);
        })
    });
    return promise;
  }
}
