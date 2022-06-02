import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderPage } from './order.page';

import { OrderPageRoutingModule } from './order-routing.module';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    OrderPageRoutingModule
  ],
  declarations: [
    OrderPage,
    OrderItemComponent,
    OrderListComponent,
    OrderDetailComponent,
  ],
  entryComponents: [
    OrderItemComponent,
    OrderListComponent,
  ]
})
export class OrderPageModule {}
