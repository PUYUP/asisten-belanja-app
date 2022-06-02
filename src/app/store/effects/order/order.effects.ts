import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@capacitor/app';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OrderService } from 'src/app/services/order.service';
import { createCart, resetCart } from '../../actions/cart/cart.actions';
import { createOrder, createOrderFailure, createOrderSuccess, loadOrders, loadOrdersFailure, loadOrdersSuccess, retrieveOrder, retrieveOrderFailure, retrieveOrderSuccess, updateOrder, updateOrderFailure, updateOrderSuccess } from '../../actions/order/order.actions';

@Injectable()
export class OrderEffects {

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private router: Router,
    private store: Store<AppState>,
    public toastController: ToastController
  ) { }
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    await toast.present()
  }

  // ...
  // CREATE ORDER
  // ...
  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrder),
      mergeMap((payload) => {
        return this.orderService.createOrder(payload?.data).pipe(
          map((response) => {
            return createOrderSuccess({
              data: response,
            });
          }),
          catchError((error) => of(createOrderFailure({ error: error })))
        );
      })
    )
  );

  createOrderSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrderSuccess),
      map((payload) => {
        this.store.dispatch(retrieveOrderSuccess({ data: payload.data }));

        // then create new cart
        let title = + new Date();
        const data = {
          title: title.toString(),
          status: 'publish',
          meta: {
            '_cart_status': 'prepare',
          },
        }

        this.store.dispatch(createCart({ data: data }));
        this.router.navigate(['/tabs/order', payload.data.id]);
      })
    ), {dispatch: false}
  );

  createOrderFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrderFailure),
      map((payload) => {
        let httpError = payload?.error;
        let message = httpError?.body?.message;

        if (message) {
          this.presentToast(message);
        }
      })
    ), {dispatch: false}
  );

  // ...
  // LOAD ORDERS
  // ...
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrders),
      mergeMap((payload) => {
        return this.orderService.loadOrders(payload?.filter).pipe(
          map((response) => {
            return loadOrdersSuccess({
              data: response,
            });
          }),
          catchError((error) => of(loadOrdersFailure({ error: error })))
        );
      })
    )
  );

  loadOrdersSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrdersSuccess),
      map((payload) => {
        // pass
      })
    ), {dispatch: false}
  );

  loadOrdersFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrdersFailure),
      map((payload) => {
        let httpError = payload?.error;
        let message = httpError?.body?.message;

        if (message) {
          this.presentToast(message);
        }
      })
    ), {dispatch: false}
  );

  // ...
  // RETRIEVE
  // ...
  retrieveOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveOrder),
      mergeMap((payload) => {
        return this.orderService.retrieveOrder(payload?.id).pipe(
          map((response) => {
            return retrieveOrderSuccess({
              data: response,
            });
          }),
          catchError((error) => of(retrieveOrderFailure({ error: error })))
        );
      })
    )
  );

  retrieveOrderSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveOrderSuccess),
      map((payload) => {
        // pass
      })
    ), {dispatch: false}
  );

  retrieveOrderFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveOrderFailure),
      map((payload) => {
        let httpError = payload?.error;
        let message = httpError?.body?.message;

        if (message) {
          this.presentToast(message);
        }
      })
    ), {dispatch: false}
  );

  // ...
  // UPDATE
  // ...
  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOrder),
      mergeMap((payload) => {
        return this.orderService.updateOrder(payload?.data, payload.id).pipe(
          map((response) => {
            return updateOrderSuccess({
              data: response,
            });
          }),
          catchError((error) => of(updateOrderFailure({ error: error })))
        );
      })
    )
  );

  updateOrderSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOrderSuccess),
      map((payload) => {
        // pass
      })
    ), {dispatch: false}
  );

  updateOrderFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrderFailure),
      map((payload) => {
        let httpError = payload?.error;
        let message = httpError?.body?.message;

        if (message) {
          this.presentToast(message);
        }
      })
    ), {dispatch: false}
  );

}
