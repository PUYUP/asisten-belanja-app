import { Component, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadOrders } from 'src/app/store/actions/order/order.actions';
import { selectOrders } from 'src/app/store/selectors/order/order.selectors';

import { PushNotifications } from '@capacitor/push-notifications';
import { FcmService } from 'src/app/services/fcm.service';

@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
  styleUrls: ['order.page.scss']
})
export class OrderPage implements OnInit {

  order$: Observable<any>;

  constructor(
    private _store: Store<AppState>,
    private _fcm: FcmService,
  ) { 
    this.order$ = this._store.pipe(select(selectOrders));
  }

  onRefresh() {
    this._store.dispatch(loadOrders({ filter: {} }));
  }
  
  ngOnInit(): void {
    this._store.dispatch(loadOrders({ filter: {} }));
  }

  ionViewDidEnter() {
    this._fcm.clearNotifications();
  }

}
