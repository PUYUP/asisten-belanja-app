import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartPage } from './cart.page';

import { CartPageRoutingModule } from './cart-routing.module';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartItemEditorComponent } from './components/cart-item-editor/cart-item-editor.component';
import { CartItemListComponent } from './components/cart-item-list/cart-item-list.component';
import { CartAddressEditorComponent } from './components/cart-address-editor/cart-address-editor.component';
import { CartCalendarComponent } from './components/cart-calendar/cart-calendar.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CartPageRoutingModule
  ],
  declarations: [
    CartPage,
    CartListComponent,
    CartItemComponent,
    CartItemEditorComponent,
    CartItemListComponent,
    CartAddressEditorComponent,
    CartCalendarComponent,
  ],
  entryComponents: [
    CartListComponent,
    CartItemComponent,
    CartItemEditorComponent,
    CartItemListComponent,
    CartAddressEditorComponent,
    CartCalendarComponent,
  ]
})
export class CartPageModule {}
