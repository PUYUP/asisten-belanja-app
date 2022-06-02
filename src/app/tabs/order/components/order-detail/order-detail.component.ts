import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '@capacitor/app';
import { AlertController } from '@ionic/angular';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';
import { retrieveOrder, updateOrder } from 'src/app/store/actions/order/order.actions';
import { selectRetrievedOrder } from 'src/app/store/selectors/order/order.selectors';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {

  id: any;
  currentStatus: any;
  order$: Observable<any>;

  orderStatus = [
    {
      id: 'created',
      label: 'Menunggu Konfirmasi',
      action: '<span class="text-danger fw-bold">Caranya <i>Share Loc</i> alamat pengantaran ke No. WA 0852 6676 9909</span>',
      passed: false,
    },
    {
      id: 'confirmed',
      label: 'Terkonfirmasi',
      action: 'Asisten bersiap belanja',
      passed: false,
    },
    {
      id: 'shopping',
      label: 'Asisten Berbelanja',
      action: 'Bantu asisten Anda jika ada pertanyaan ya',
      passed: false,
    },
    {
      id: 'delivery',
      label: 'Dalam Pengantaran',
      action: 'Asisten otw ke alamat',
      passed: false,
    },
    {
      id: 'delivered',
      label: 'Sampai',
      action: 'Asisten sampai dialamat. Periksa belanjaan, serahkan pembayaran dan klik "Selesai"',
      passed: false,
    },
    {
      id: 'closed',
      label: 'Selesai',
      action: 'Terima kasih ya jangan lupa pesan lagi',
      passed: false,
    },
  ]

  constructor(
    public alertController: AlertController,
    private _route: ActivatedRoute,
    private _store: Store<AppState>,
    private _actionSubject: ActionsSubject,
  ) { 
    this.order$ = this._store.pipe(select(selectRetrievedOrder));
  }

  /**
   * Present confirm order closed
   */
   async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Yakin belanja telah selesai?',
      buttons: [
        {
          text: 'Cek Lagi',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ya, Selesai',
          id: 'confirm-button',
          handler: () => {
            this._store.dispatch(updateOrder({
              data: {
                meta: {
                  _order_status: 'closed',
                },
              },
              id: this.id,
            }));
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.id = this._route.snapshot.paramMap.get('id');
    this._store.dispatch(retrieveOrder({ id: this.id }));

    this._actionSubject.pipe(skip(1)).subscribe((state: any) => {
      switch (state?.type) {
        case '[Order] Retrieve Success':
        case '[Order] Update Success':
          let status = state?.data?.meta?._order_status;
          let index = this.orderStatus.findIndex((d: any) => d.id == status) + 1;

          for (let i = 0; i < index; i++) {
            this.orderStatus[i] = {
              ...this.orderStatus[i],
              passed: true,
            }
          }

          this.currentStatus = this.orderStatus.find((d: any) => d.id == status);
          break;
        default:
          // pass
      }
    });
  }

  onRefresh() {
    this._store.dispatch(retrieveOrder({ id: this.id }));
  }

  onMarkClose() {
    this.presentAlertConfirm();
  }

}
