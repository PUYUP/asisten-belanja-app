import { Component, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectRetrievedCart } from 'src/app/store/selectors/cart/cart.selectors';

@Component({
  selector: 'app-cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrls: ['./cart-item-list.component.scss'],
})
export class CartItemListComponent implements OnInit {

  cart$: Observable<any>;

  constructor(
    private _store: Store<AppState>
  ) { }

  ngOnInit() {
    this.cart$ = this._store.pipe(select(selectRetrievedCart));
  }

}
