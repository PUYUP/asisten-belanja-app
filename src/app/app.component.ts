import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, IonRouterOutlet, ModalController, Platform, ToastController } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    public actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private platform: Platform,
  ) { 
    // this.initializeApp();
  }

  async initializeApp() {
    const isModalOpenend = await this.modalController.getTop();
    const isToastOpenend = await this.toastController.getTop();
    const isActionSheetOpenend = await this.actionSheetController.getTop();
    const isAlertOpenend = await this.alertController.getTop();

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack() && !isModalOpenend && !isToastOpenend && !isActionSheetOpenend && !isAlertOpenend) {
        App.exitApp();
      }
    });
  }
  
}
