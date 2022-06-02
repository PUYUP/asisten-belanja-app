import { createAction, props } from '@ngrx/store';

export const userSignup = createAction(
  '[User] Signup',
  props<{ data: any }>()
);
export const userSignupSuccess = createAction(
  '[User] Signup Success',
  props<{ data: any }>()
);
export const userSignupFailure = createAction(
  '[User] Signup Failure',
  props<{ error: any }>()
);

export const userSignin = createAction(
  '[User] Signin',
  props<{ data: any }>()
);
export const userSigninSuccess = createAction(
  '[User] Signin Success',
  props<{ data: any }>()
);
export const userSigninFailure = createAction(
  '[User] Signin Failure',
  props<{ error: any }>()
);

export const userSignout = createAction(
  '[User] Signout'
);
export const userSignoutSuccess = createAction(
  '[User] Signout Success',
  props<{ data: any }>()
);
export const userSignoutFailure = createAction(
  '[User] Signout Failure',
  props<{ error: any }>()
);

export const retrieveUser = createAction(
  '[User] Retrieve'
);
export const retrieveUserSuccess = createAction(
  '[User] Retrieve Success',
  props<{ data: any }>()
);
export const retrieveUserFailure = createAction(
  '[User] Retrieve Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[User] Update',
  props<{ data: any }>()
);
export const updateUserSuccess = createAction(
  '[User] Update Success',
  props<{ data: any }>()
);
export const updateUserFailure = createAction(
  '[User] Update Failure',
  props<{ error: any }>()
);