import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GuestOnlyGuard implements CanActivate {

  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (!this._userService.isUserSigned) {
      return true;
    } else {
      this._router.navigate(['/tabs/cart']);
      return false;
    }
  }
  
}
