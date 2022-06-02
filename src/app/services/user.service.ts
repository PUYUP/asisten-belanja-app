import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '@capacitor/app';

const USER = environment.apiEndpoint + 'wp/v2/users';
const GENERATE_TOKEN = environment.apiEndpoint + 'jwt-auth/v1/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _httpClient: HttpClient,
    private _store: Store<AppState>,
  ) { }

  storeUserData(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  updateUserData(newUserData: any) {
    let ses = this.getUserData;
    if (ses) {
      let updateData = {
        ...ses,
        user: {
          ...newUserData
        }
      }

      this.storeUserData(updateData);
    }
  }

  get getUserData() {
    let ses = localStorage.getItem('user');
    return ses ? JSON.parse(ses) : null;
  }

  get getUserToken() {
    let ses = this.getUserData;
    return ses ? ses?.token : null;
  }

  get isUserSigned() {
    return this.getUserToken ? true : false;
  }

  private deleteUserData() {
    localStorage.removeItem('user');
  }

  signin(param: any = {}): Observable<any> {
    return this._httpClient.post(GENERATE_TOKEN, param);
  }

  signup(param: any = {}): Observable<any> {
    return this._httpClient.post(USER, param);
  }

  signout(): any {
    return this.deleteUserData();
  }

  update(param: any = {}): Observable<any> {
    return this._httpClient.post(USER + '/me', param);
  }

  changePassword(param: any = {}): Observable<any> {
    return this._httpClient.post(USER + '/change-password', param);
  }

  lostPasswordGenerateToken(param: any = {}): Observable<any> {
    return this._httpClient.post(USER + '/lost-password', param);
  }

  lostPasswordConfirm(param: any = {}): Observable<any> {
    return this._httpClient.post(USER + '/lost-password-confirm', param);
  }

  retrieve(): Observable<any> {
    return this._httpClient.get(USER + '/me');
  }

}
