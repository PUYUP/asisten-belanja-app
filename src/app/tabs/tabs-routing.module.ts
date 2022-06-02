import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'help',
        loadChildren: () => import('./help/help.module').then(m => m.HelpPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/cart',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
