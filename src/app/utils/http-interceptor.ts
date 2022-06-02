import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
  ) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenAccess = this.userService.getUserToken;

    if (tokenAccess) {
      httpRequest = httpRequest.clone({
        setHeaders: {
          Authorization: 'Bearer ' + tokenAccess,
        },
        withCredentials: true, // send cookies
      });
    }

    return next.handle(httpRequest).pipe(
      map((res) => res),
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            // Handle unauthorized error
            // console.log("Unauthorized");
            // logout() user
          } else if (err.status === 500) {
            // Handler internal server error
            // console.log("Server is not responding.")
            // alert("Try after some time.")
          }
          // ......
        }

        return throwError(err);
      })
    );
  }
}
