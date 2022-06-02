import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Capacitor } from '@capacitor/core';
import { UserService } from '../services/user.service';

type HttpMethod =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'head'
  | 'delete'
  | 'upload'
  | 'download';

@Injectable()
export class NativeHttpInterceptor implements HttpInterceptor {
  constructor(
    private nativeHttp: HTTP,
    private platform: Platform,
    private userService: UserService
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!Capacitor.isNativePlatform()) {
      return next.handle(request);
    }

    return from(this.handleNativeRequest(request));
  }

  private async handleNativeRequest(
    request: HttpRequest<any>
  ): Promise<HttpResponse<any>> {
    const tokenAccess = this.userService.getUserToken;
    
    if (tokenAccess) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + tokenAccess,
        },
        withCredentials: true, // send cookies
      });
    }

    const params = request.params;
    const headerKeys = request.headers.keys();
    const header = {};
    const param = {};

    params.keys().forEach((key) => {
      param[key] = params.get(key);
    });

    headerKeys.forEach((key) => {
      header[key] = request.headers.get(key);
    });

    try {
      await this.platform.ready();

      const method = <HttpMethod>request.method.toLowerCase();

      const nativeHttpResponse = await this.nativeHttp.sendRequest(
        request.url,
        {
          method: method,
          data: request.body,
          headers: header,
          params: param,
          serializer: 'json',
        }
      );

      let body: any;

      try {
        body = JSON.parse(nativeHttpResponse.data);
      } catch (error) {
        body = { response: nativeHttpResponse.data };
      }

      const response = new HttpResponse({
        body: body,
        status: nativeHttpResponse.status,
        headers: new HttpHeaders(nativeHttpResponse.headers),
        url: nativeHttpResponse.url,
      });

      console.log('— Response success');
      console.log(response);

      return Promise.resolve(response);
    } catch (error) {
      if (!error.status) {
        return Promise.reject(error);
      }

      const response = new HttpResponse({
        body: JSON.parse(error.error),
        status: error.status,
        headers: error.headers,
        url: error.url,
      });

      console.log('— Response error');
      console.log(error);

      return Promise.reject(response);
    }
  }
}
