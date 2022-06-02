import { createAction, props } from '@ngrx/store';

// CREATE
export const createOrder = createAction(
  '[Order] Create',
  props<{ data: any }>()
);
export const createOrderSuccess = createAction(
  '[Order] Create Success',
  props<{ data: any }>()
);
export const createOrderFailure = createAction(
  '[Order] Create Failure',
  props<{ error: any }>()
);

// UPDATE
export const updateOrder = createAction(
  '[Order] Update',
  props<{ data: any, id: string }>()
);
export const updateOrderSuccess = createAction(
  '[Order] Update Success',
  props<{ data: any }>()
);
export const updateOrderFailure = createAction(
  '[Order] Update Failure',
  props<{ error: any }>()
);

// RETRIEVE
export const retrieveOrder = createAction(
  '[Order] Retrieve',
  props<{ id: any }>()
);
export const retrieveOrderSuccess = createAction(
  '[Order] Retrieve Success',
  props<{ data: any }>()
);
export const retrieveOrderFailure = createAction(
  '[Order] Retrieve Failure',
  props<{ error: any }>()
);

// LOADS
export const loadOrders = createAction(
  '[Order] Loads',
  props<{ filter?: any }>()
);
export const loadOrdersSuccess = createAction(
  '[Order] Loads Success',
  props<{ data: any }>()
);
export const loadOrdersFailure = createAction(
  '[Order] Loads Failure',
  props<{ error: any }>()
);
