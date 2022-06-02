import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() { }
  
  onDismiss() {
    this.modalController.dismiss();
  }

}
