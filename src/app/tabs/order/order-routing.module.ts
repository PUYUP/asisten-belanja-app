import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderPage } from './order.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: OrderPage,
      },
      {
        path: ':id',
        component: OrderDetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderPageRoutingModule {}
