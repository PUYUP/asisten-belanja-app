import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AppState } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { addItemToCart, updateItemCart } from 'src/app/store/actions/cart/cart.actions';
import { selectRetrievedCart } from 'src/app/store/selectors/cart/cart.selectors';

@Component({
  selector: 'app-cart-item-editor',
  templateUrl: './cart-item-editor.component.html',
  styleUrls: ['./cart-item-editor.component.scss'],
})
export class CartItemEditorComponent implements OnInit {

  @ViewChild('myForm') ngForm: NgForm;
  
  @Input('cart') cart: any;
  @Input('item') item: any;
  @Input('index') index: any;

  disableSubmit: boolean = false;
  formGroup: FormGroup;
  cart$: Observable<any>;

  constructor(
    public modalController: ModalController,
    private _fb: FormBuilder,
    private _store: Store<AppState>,
    private _actionSubject: ActionsSubject,
  ) { 
    this.cart$ = this._store.pipe(select(selectRetrievedCart));
  }

  ngOnInit() {
    this.formGroup = this._fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      note: [''],
    });

    this._actionSubject.pipe(skip(1)).subscribe((state: any) => {
      switch (state?.type) {
        case '[Cart] Add Item Success':
        case '[Cart] Update Item Success':
          this.modalController.dismiss();
          break;
        case '[Cart] Add Item Failure':
        case '[Cart] Update Item Failure':
          this.disableSubmit = false;
          break;
        default:
        // pass
      }
    });

    if (this.item && this.item?.name) {
      this.formGroup.patchValue({
        name: this.item.name,
        quantity: this.item.quantity,
        note: this.item.note,
      });
    }
  }

  onFormSubmit() {
    this.disableSubmit = true;

    let currentItems = this.cart.meta._cart_items;
    let cartItem = {
      'name': this.formGroup.value.name,
      'quantity': this.formGroup.value.quantity,
      'note': this.formGroup.value.note,
    }
    let cartItems = [];

    if (this.item && this.item.name) {
      // update item
      cartItems = [
        ...currentItems.slice(0, this.index),
        {
          ...currentItems[this.index],
          ...cartItem
        },
        ...currentItems.slice(this.index + 1),
      ];

      this._store.dispatch(updateItemCart({
        data: {
          meta: {
            _cart_items: cartItems,
          },
          index: this.index,
          cart_item: cartItem,
        },
        cartId: this.cart?.id,
      }));
    } else {
      // new item
      cartItems = [
        ...currentItems,
        cartItem
      ];
    
      this._store.dispatch(addItemToCart({
        data: {
          meta: {
            _cart_items: cartItems,
          }
        },
        cartId: this.cart?.id,
      }));
    }
  }

  onSave() {
    this.ngForm.ngSubmit.emit();
  }

  onDismiss() {
    this.modalController.dismiss();
  }

}
