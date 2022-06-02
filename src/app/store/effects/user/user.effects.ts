import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@capacitor/app';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import {
  retrieveUser,
  retrieveUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
  userSignin,
  userSigninFailure,
  userSigninSuccess,
  userSignout,
  userSignoutSuccess,
  userSignup,
  userSignupFailure,
  userSignupSuccess
} from '../../actions/user/user.actions';


@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
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
  // SIGNIN
  // ...
  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignin),
      mergeMap((payload) => {
        return this.userService.signin(payload?.data).pipe(
          map((response) => {
            return userSigninSuccess({
              data: response,
            });
          }),
          catchError((error) => of(userSigninFailure({ error: error })))
        );
      })
    )
  );

  signinSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSigninSuccess),
      map((payload) => {
        // save user data to localStorage
        this.userService.storeUserData(payload.data);
        this.store.dispatch(retrieveUser());
        this.router.navigate(['/tabs/cart']);
      })
    ), {dispatch: false}
  );

  signinFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSigninFailure),
      map((payload) => {
        let httpError = payload?.error;
        let errorCode = httpError?.body?.code;
        let message = httpError?.body?.message;

        if (errorCode == '[jwt_auth] incorrect_password') {
          message = 'Kombinasi nomor WhatsApp dan tanggal lahir tidak cocok.';
        }

        if (errorCode == '[jwt_auth] invalid_username') {
          message = 'Nomor WhatsApp tidak terdaftar.';
        }

        if (message) {
          this.presentToast(message);
        }
      })
    ), {dispatch: false}
  );


  // ...
  // SIGNUP
  // ...
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignup),
      mergeMap((payload) => {
        return this.userService.signup(payload?.data).pipe(
          map((response) => {
            return userSignupSuccess({
              data: {
                ...response,
                password: payload?.data?.password,
              }
            });
          }),
          catchError((error) => of(userSignupFailure({ error: error })))
        );
      })
    )
  );

  signupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignupSuccess),
      map((payload) => {
        // login after register
        this.store.dispatch(userSignin({
          data: {
            username: payload?.data?.username,
            password: payload?.data?.password,
          }
        }))
      })
    ), {dispatch: false}
  );

  signupFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignupFailure),
      map((payload) => {
        let httpError = payload?.error;
        let errorCode = httpError?.body?.code;
        let message = httpError?.body?.message;

        if (errorCode === 'existing_user_email' || errorCode === 'existing_user_login') {
          message = 'Nomor WhatsApp sudah digunakan akun lain.';
        }

        if (message) {
          this.presentToast(message);
        }
      })
    ), {dispatch: false}
  );

  // ...
  // UPDATE
  // ...
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap((payload) => {
        return this.userService.update(payload?.data).pipe(
          map((response) => {
            return updateUserSuccess({
              data: response,
            });
          }),
          catchError((error) => of(updateUserFailure({ error: error })))
        );
      })
    )
  );

  updateUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserSuccess),
      map((payload) => {
        this.store.dispatch(retrieveUser());
      })
    ), {dispatch: false}
  );

  updateUserFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUserFailure),
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
      ofType(retrieveUser),
      mergeMap((payload) => {
        return this.userService.retrieve().pipe(
          map((response) => {
            let savedUserData = this.userService.getUserData;

            return retrieveUserSuccess({
              data: {
                ...savedUserData,
                detail: response,
              },
            });
          }),
          catchError((error) => of(userSigninFailure({ error: error })))
        );
      })
    )
  );

  retriveSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveUserSuccess),
      map((payload) => {
        // pass
      })
    ), {dispatch: false}
  );

  // SIGNOUT
  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignout),
      map((payload) => {
        this.userService.signout();
        return userSignoutSuccess({data: {}})
      })
    )
  );
  
  signoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userSignoutSuccess),
      map((payload) => {
        this.router.navigate([''], { replaceUrl: true });
      })
    ), {dispatch: false}
  );
  
}
