import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { ActionsSubject, Store } from '@ngrx/store';

import * as moment from 'moment';
import { skip } from 'rxjs/operators';
import { updateCart } from 'src/app/store/actions/cart/cart.actions';

@Component({
  selector: 'app-cart-calendar',
  templateUrl: './cart-calendar.component.html',
  styleUrls: ['./cart-calendar.component.scss'],
})
export class CartCalendarComponent implements OnInit {

  @Input('cart') cart: any;
  @Input('selectedDate') selectedDate: any;

  today: any;
  delivery: string;

  constructor(
    public modalController: ModalController,
    private _store: Store<AppState>,
    private _actionsSubject: ActionsSubject,
  ) { }

  ngOnInit() { 
    this.today = moment().locale('id').add(1, 'day').format('YYYY-MM-DD');
    
    /*
    this._actionsSubject.pipe(skip(1)).subscribe((state: any) => {
      switch (state.type) {
        case '[Cart] Update Success':
          if (state?.data?.meta?._cart_delivery == this.delivery) {
            this.onDismiss();
          }
          break;
        default:
          // pass
      }
    });
    */
  }

  ionViewDidEnter() {
    this.delivery = this.cart.meta._cart_delivery;
  }

  onSelectedDate(event: any) {
    let value = event?.detail?.value;
    this.modalController.dismiss({
      selected_date: value,
      delivery: this.delivery,
    });
  }

  onDeliveryChange(event: any) {
    let _delivery = event.detail.value;

    if (_delivery === 'instant') {
      /*
      this._store.dispatch(updateCart({
        data: {
          meta: {
            _cart_delivery: _delivery,
            _cart_delivery_date: moment().locale('id').format('YYYY-MM-DD'),
          }
        },
        cartId: this.cart.id,
      }));
      */

      if (_delivery != this.cart.meta._cart_delivery) {
        setTimeout(() => {
          this.modalController.dismiss({
            delivery: this.delivery,
            selected_date: moment().locale('id').format('YYYY-MM-DD'),
          });
        }, 500);
      }
    }

    this.delivery = _delivery;
  }
  
  onDismiss() {
    this.modalController.dismiss();
  }

}
