import { Component, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCarts } from 'src/app/store/actions/cart/cart.actions';
import { selectRetrievedCart } from 'src/app/store/selectors/cart/cart.selectors';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {

  cart$: Observable<any>;

  constructor(
    private _store: Store<AppState>
  ) { 
    this.cart$ = this._store.pipe(select(selectRetrievedCart));
  }

  ngOnInit() {
    
  }

}
