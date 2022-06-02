import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@capacitor/app';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { addItemToCart, addItemToCartFailure, addItemToCartSuccess, createCart, createCartFailure, createCartSuccess, deleteItemCart, deleteItemCartFailure, loadCarts, loadCartsFailure, loadCartsSuccess, retrieveCart, retrieveCartSuccess, updateCart, updateCartFailure, updateCartSuccess, updateItemCart, updateItemCartFailure, updateItemCartSuccess } from '../../actions/cart/cart.actions';

@Injectable()
export class CartEffects {

  constructor(
    private actions$: Actions,
    private cartService: CartService,
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
  // CREATE CART
  // ...
  createCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCart),
      mergeMap((payload) => {
        return this.cartService.createCart(payload?.data).pipe(
          map((response) => {
            return createCartSuccess({
              data: response,
            });
          }),
          catchError((error) => of(createCartFailure({ error: error })))
        );
      })
    )
  );

  createCartSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCartSuccess),
      map((payload) => {
        this.store.dispatch(retrieveCartSuccess({ data: payload.data }));
      })
    ), {dispatch: false}
  );

  createCartFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCartFailure),
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
  // UPDATE CART
  // ...
  updateCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCart),
      mergeMap((payload) => {
        return this.cartService.addItemToCart(payload?.data, payload.cartId).pipe(
          map((response) => {
            return updateCartSuccess({
              data: response,
            });
          }),
          catchError((error) => of(updateCartFailure({ error: error })))
        );
      })
    )
  );

  updateCartSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCartSuccess),
      map((payload) => {
        // pass
      })
    ), {dispatch: false}
  );

  // ...
  // ADD ITEM TO CART
  // ...
  addItemToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItemToCart),
      mergeMap((payload) => {
        return this.cartService.addItemToCart(payload?.data, payload?.cartId).pipe(
          map((response) => {
            return addItemToCartSuccess({
              data: response,
            });
          }),
          catchError((error) => of(addItemToCartFailure({ error: error })))
        );
      })
    )
  );

  addItemToCartSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItemToCartSuccess),
      map((payload) => {
        // save cart data to localStorage
        // this.cartService.storeCartData(payload.data);
        // this.router.navigate(['/tabs/cart']);
      })
    ), {dispatch: false}
  );

  addItemToCartFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItemToCartFailure),
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
  // UPDATE CART ITEM
  // ...
  updateCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateItemCart),
      mergeMap((payload) => {
        let cleanItems = payload?.data?.meta._cart_items.filter((d: any) => d.name && d.quantity && d);
        let data = {
          meta: {
            _cart_items: cleanItems,
          }
        }

        return this.cartService.addItemToCart(data, payload?.cartId).pipe(
          map((response) => {
            return updateItemCartSuccess({
              data: {
                ...response,
                cart_item: payload.data.cart_item,
                index: payload.data.index,
              }
            });
          }),
          catchError((error) => of(updateItemCartFailure({ error: error })))
        );
      })
    )
  );

  updateCartItemSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateItemCartSuccess),
      map((payload) => {
        // save cart data to localStorage
        // this.cartService.storeCartData(payload.data);
        // this.router.navigate(['/tabs/cart']);
      })
    ), {dispatch: false}
  );

  updateCartItemFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateItemCartFailure),
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
  // DELETE CART ITEM
  // ...
  deleteCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteItemCart),
      mergeMap((payload) => {
        return this.cartService.addItemToCart(payload?.data, payload?.cartId).pipe(
          map((response) => {
            // pass
          }),
          catchError((error) => of(deleteItemCartFailure({ error: error })))
        );
      })
    ), {dispatch: false}
  );

  deleteCartItemFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteItemCartFailure),
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
  // LOAD CARTS
  // ...
  loadCarts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCarts),
      mergeMap((payload) => {
        return this.cartService.loadCarts(payload?.filter).pipe(
          map((response) => {
            return loadCartsSuccess({
              data: {
                'retrieve': response.length > 0 ? response[0] : {},
              },
            });
          }),
          catchError((error) => of(loadCartsFailure({ error: error })))
        );
      })
    )
  );

  loadCartsSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCartsSuccess),
      map((payload) => {
        // save cart data to localStorage
        // this.cartService.storeCartData(payload.data);
        // this.router.navigate(['/tabs/cart']);
      })
    ), {dispatch: false}
  );

  loadCartsCartFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCartsFailure),
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
  retrive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveCart),
      mergeMap((payload) => {
        return this.cartService.retrieveCart(payload?.id).pipe(
          map((response) => {
            return retrieveCartSuccess({
              data: response,
            });
          }),
          catchError((error) => of(cartRetrieveFailure({ error: error })))
        );
      })
    )
  );

  retriveSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveCartSuccess),
      map((payload) => {
        // pass
      })
    ), {dispatch: false}
  );

}
function cartRetrieveFailure(arg0: { error: any; }): any {
  throw new Error('Function not implemented.');
}

