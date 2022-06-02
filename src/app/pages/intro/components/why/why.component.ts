import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-why',
  templateUrl: './why.component.html',
  styleUrls: ['./why.component.scss'],
})
export class WhyComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() { }
  
  onDismiss() {
    this.modalController.dismiss();
  }

}
