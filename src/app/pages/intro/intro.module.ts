import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroPageRoutingModule } from './intro-routing.module';

import { IntroPage } from './intro.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { WhyComponent } from './components/why/why.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    IntroPage,
    WhyComponent,
  ],
  entryComponents: [
    WhyComponent,
  ]
})
export class IntroPageModule {}
