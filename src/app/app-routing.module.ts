import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuestOnlyGuard } from './guards/guest-only.guard';
import { UserOnlyGuard } from './guards/user-only.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule),
    canActivate: [GuestOnlyGuard],
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [UserOnlyGuard],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
