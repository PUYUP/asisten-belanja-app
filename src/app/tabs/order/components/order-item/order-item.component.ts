import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {

  @Input('item') item: any;
  @Input('index') index: any;
  @Input('last') last: any;

  constructor() { }

  ngOnInit() {}

}
