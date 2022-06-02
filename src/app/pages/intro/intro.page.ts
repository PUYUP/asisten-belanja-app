import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignupFormComponent } from 'src/app/shared/signup-form/signup-form.component';
import { WhyComponent } from './components/why/why.component';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  /**
   * Present signup form
   */
  async presentSignupForm() {
    const modal = await this.modalController.create({
      component: SignupFormComponent,
    });

    await modal.present();
  }

  /**
   * Present why modal
   */
   async presentWhyModal() {
    const modal = await this.modalController.create({
      component: WhyComponent,
    });

    await modal.present();
  }

  ngOnInit() {
  }

  onSignup() {
    this.presentSignupForm();
  }

  onWhy() {
    this.presentWhyModal();
  }

}
