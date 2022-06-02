import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { deleteItemCart } from 'src/app/store/actions/cart/cart.actions';
import { CartItemEditorComponent } from '../cart-item-editor/cart-item-editor.component';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {

  @Input('cart') cart: any;
  @Input('item') item: any;
  @Input('index') index: any;

  constructor(
    public modalController: ModalController,
    private _store: Store<AppState>
  ) { }

  /**
   * Present item editor
   */
  async presentItemEditor(item: any, index: number) {
    const modal = await this.modalController.create({
      component: CartItemEditorComponent,
      componentProps: {
        cart: this.cart,
        item: item,
        index: index,
      }
    });

    await modal.present();
  }

  ngOnInit() { }
  
  onEdit(item: any, index: number) {
    this.presentItemEditor(item, index);
  }

  onDelete(item: any, index: number) {
    let copiedItems = [...this.cart.meta._cart_items];
    copiedItems.splice(index, 1);

    this._store.dispatch(deleteItemCart({
      data: {
        cart_item: item,
        meta: {
          _cart_items: copiedItems,
        }
      },
      cartId: this.cart.id
    }));
  }

}
