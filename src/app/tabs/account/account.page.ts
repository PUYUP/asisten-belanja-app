import { Component } from '@angular/core';
import { AppState } from '@capacitor/app';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { retrieveUser, userSignout } from 'src/app/store/actions/user/user.actions';
import { selectRetrievedUser } from 'src/app/store/selectors/user/user.selectors';

@Component({
  selector: 'app-account',
  templateUrl: 'account.page.html',
  styleUrls: ['account.page.scss']
})
export class AccountPage {

  user$: Observable<any>;

  constructor(
    private _store: Store<AppState>
  ) {
    this.user$ = this._store.pipe(select(selectRetrievedUser));
  }

  ionViewDidEnter() {
    this._store.dispatch(retrieveUser());
  }

  onSignout() {
    this._store.dispatch(userSignout());
  }

}
