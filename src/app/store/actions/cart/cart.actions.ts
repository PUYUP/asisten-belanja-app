import { createAction, props } from '@ngrx/store';

// CREATE
export const createCart = createAction(
  '[Cart] Create',
  props<{ data: any }>()
);
export const createCartSuccess = createAction(
  '[Cart] Create Success',
  props<{ data: any }>()
);
export const createCartFailure = createAction(
  '[Cart] Create Failure',
  props<{ error: any }>()
);

// UPDATE CART
export const updateCart = createAction(
  '[Cart] Update',
  props<{ data: any, cartId: number }>()
);
export const updateCartSuccess = createAction(
  '[Cart] Update Success',
  props<{ data: any }>()
);
export const updateCartFailure = createAction(
  '[Cart] Update Failure',
  props<{ error: any }>()
);

// ADD ITEM
export const addItemToCart = createAction(
  '[Cart] Add Item',
  props<{ data: any, cartId: number }>()
);
export const addItemToCartSuccess = createAction(
  '[Cart] Add Item Success',
  props<{ data: any }>()
);
export const addItemToCartFailure = createAction(
  '[Cart] Add Item Failure',
  props<{ error: any }>()
);

// UPDATE ITEM
export const updateItemCart = createAction(
  '[Cart] Update Item',
  props<{ data: any, cartId: number }>()
);
export const updateItemCartSuccess = createAction(
  '[Cart] Update Item Success',
  props<{ data: any }>()
);
export const updateItemCartFailure = createAction(
  '[Cart] Update Item Failure',
  props<{ error: any }>()
);

// DELETE ITEM
export const deleteItemCart = createAction(
  '[Cart] Delete Item',
  props<{ data: any, cartId: number }>()
);
export const deleteItemCartSuccess = createAction(
  '[Cart] Delete Item Success',
  props<{ data: any }>()
);
export const deleteItemCartFailure = createAction(
  '[Cart] Delete Item Failure',
  props<{ error: any }>()
);

// LOADS
// @action can be 'initialize' and 'all'
export const loadCarts = createAction(
  '[Cart] Loads',
  props<{ filter: any }>()
);
export const loadCartsSuccess = createAction(
  '[Cart] Loads Success',
  props<{ data: any }>()
);
export const loadCartsFailure = createAction(
  '[Cart] Loads Failure',
  props<{ error: any }>()
);

// RETRIEVE
export const retrieveCart = createAction(
  '[Cart] Retrieve',
  props<{ id: any }>()
);
export const retrieveCartSuccess = createAction(
  '[Cart] Retrieve Success',
  props<{ data: any }>()
);
export const retrieveCartFailure = createAction(
  '[Cart] Retrieve Failure',
  props<{ error: any }>()
);

export const resetCart = createAction(
  '[Cart] Reset'
);