import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN_SESSION } from '../const/const';


export const authInterceptor: HttpInterceptor = {
  intercept: (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    const token: string | null = localStorage.getItem(TOKEN_SESSION);
    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
};
