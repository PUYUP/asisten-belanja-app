import { Component } from '@angular/core';
import { AppState } from '@capacitor/app';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadPosts } from 'src/app/store/actions/general/general.actions';
import { selectPosts } from 'src/app/store/selectors/general/general.selectors';

@Component({
  selector: 'app-help',
  templateUrl: 'help.page.html',
  styleUrls: ['help.page.scss']
})
export class HelpPage {

  posts$: Observable<any>;

  constructor(
    private _store: Store<AppState>
  ) {
    this.posts$ = this._store.pipe(select(selectPosts));
  }

  ionViewDidEnter() {
    this._store.dispatch(loadPosts());
  }

}
