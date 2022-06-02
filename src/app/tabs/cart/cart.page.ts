import { Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from '@capacitor/app';
import { AlertController, IonContent, ModalController, ToastController } from '@ionic/angular';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { addItemToCart, createCart, loadCarts, retrieveCart, updateCart } from 'src/app/store/actions/cart/cart.actions';
import { createOrder } from 'src/app/store/actions/order/order.actions';
import { retrieveUser, updateUser } from 'src/app/store/actions/user/user.actions';
import { selectRetrievedCart } from 'src/app/store/selectors/cart/cart.selectors';
import { selectUser, selectRetrievedUser } from 'src/app/store/selectors/user/user.selectors';
import { CartAddressEditorComponent } from './components/cart-address-editor/cart-address-editor.component';
import { CartItemEditorComponent } from './components/cart-item-editor/cart-item-editor.component';
import { CartCalendarComponent } from './components/cart-calendar/cart-calendar.component';

const deliveryTypes = {
  'instant': {
    'label': 'Instan',
    'promise': '1 - 3 jam',
    'fee': 30000,
  },
  'later': {
    'label': 'Santai',
    'promise': 'Esok hari',
    'fee': 20000,
  },
}

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})
export class CartPage implements OnInit {

  @ViewChild(IonContent, {static: false}) ionContent: IonContent;

  retrieveUser$: Observable<any>;
  cart$: Observable<any>;
  onDestroy$ = new Subject<void>();

  selectedDate: string;
  address: string;
  note: string;
  delivery: string;
  deliverySelected: any;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public toastController: ToastController,
    private _store: Store<AppState>,
    private _actionSubject: ActionsSubject,
  ) { 
    // User
    this.retrieveUser$ = this._store.pipe(select(selectRetrievedUser));

    // Retrieve
    this.cart$ = this._store.pipe(select(selectRetrievedCart));
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  /**
   * Present alert confirm
   */
  async presentAlert(cart: any) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah kebutuhan sudah lengkap?',
      buttons: [
        {
          text: 'Belum, Tambah Lagi',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Sudah Lengkap',
          id: 'confirm-button',
          handler: () => {
            this.performCreate(cart);
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  /**
   * Present item editor modal
   */
  async presentAddItemEditor( cart: any ) {
    const modal = await this.modalController.create({
      component: CartItemEditorComponent,
      componentProps: {
        cart: cart,
      }
    });

    await modal.present();
  }

  /**
   * Present address editor
   */
  async presentCartAddressEditor(cart: any, userAddress: string) {
    let address = cart?.meta?._cart_delivery_address;
    const modal = await this.modalController.create({
      component: CartAddressEditorComponent,
      componentProps: {
        address: address ? address : userAddress,
        note: cart?.meta?._cart_note,
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();

    if (data) {
      this.address = data?.address;
      this.note = data?.note;

      this._store.dispatch(updateCart({
        data: {
          meta: {
            _cart_delivery_address: this.address,
            _cart_note: this.note,
          }
        },
        cartId: cart?.id,
      }));

      this._store.dispatch(updateUser({
        data: {
          meta: {
            _delivery_address: this.address,
          }
        }
      }));
    }
  }

  /**
   * Calendar modal
   */
   async presentCalendarModal(cart: any) {
    const modal = await this.modalController.create({
      component: CartCalendarComponent,
      componentProps: {
        seletedDate: cart?.meta?._cart_delivery_date,
        cart: cart,
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    
    if (data) {
      let items = cart?.meta?._cart_items;

      this.selectedDate = data?.selected_date;
      this.delivery = data?.delivery;
      this.deliverySelected = deliveryTypes[this.delivery];

      if (this.delivery == 'instant' && items?.length > 10) {
        this.presentToast('Instan hanya boleh 10 item, mohon kurangi ya itemnya');
      } else {
        this._store.dispatch(updateCart({
          data: {
            meta: {
              _cart_delivery: this.delivery,
              _cart_delivery_date: this.selectedDate,
            }
          },
          cartId: cart?.id,
        }));
      }
    }
  }

  ngOnInit(): void {
    this._actionSubject.pipe(skip(1)).subscribe((state: any) => {
      switch (state?.type) {
        case '[Cart] Add Item Success':
          setTimeout(() => {
            this.ionContent?.scrollToBottom(100);
          }, 200);
          break;
        case '[Cart] Retrieve Success':
          this.deliverySelected = deliveryTypes[state?.data?.meta?._cart_delivery];
          break;
        default:
        // pass
      }
    });
  }
  
  onAddItem(cart: any) {
    let limit = cart.meta._cart_delivery == 'later' ? 30 : 10;
    let countItem = cart.meta._cart_items?.length;

    //if (countItem < limit) {
      this.presentAddItemEditor(cart);
    //} else {
    //  this.presentToast('Maksimal ' + limit + ' item');
    //}
  }

  private _createCart() {
    let title = + new Date();
    const data = {
      title: title.toString(),
      status: 'publish',
      meta: {
        '_cart_status': 'prepare',
      },
    }

    this._store.dispatch(createCart({ data: data }));
  }

  performCreate(cart: any) {
    // Add more param to items
    let copiedItems = [...cart.meta._cart_items];
    copiedItems = copiedItems.map((d: any) => {
      d = {
        ...d,
        subtotal: 0,
        isfound: false,
      }

      return d;
    });

    let data = {
      title: cart.title.raw,
      status: 'publish',
      meta: {
        _order_items: copiedItems,
        _order_status: 'created',
        _order_cart_id: cart.id,
        _order_note: cart.meta._cart_note,
        _order_delivery: cart.meta._cart_delivery,
        _order_delivery_date: cart.meta._cart_delivery_date,
        _order_delivery_address: cart.meta._cart_delivery_address,
        _order_shopper_fee: +this.deliverySelected.fee,
      }
    }

    this._store.dispatch(createOrder({ data: data }));
  }

  ionViewDidEnter() {
    this._createCart();
    this._store.dispatch(retrieveUser());
  }

  onCreateOrder(cart: any) {
    this.presentAlert(cart);
  }

  onOpenCalendar(cart: any) {
    this.presentCalendarModal(cart);
  }

  onOpenAddress(cart: any, userAddress: string) {
    this.presentCartAddressEditor(cart, userAddress);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  
}
