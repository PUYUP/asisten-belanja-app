import { Action, createReducer, on } from '@ngrx/store';
import { INITIALIZE, LOADED, LOADING } from 'src/app/utils/statuses';
import { createOrder, createOrderSuccess, loadOrders, loadOrdersSuccess, retrieveOrder, retrieveOrderSuccess, updateOrder, updateOrderSuccess } from '../../actions/order/order.actions';


export const orderFeatureKey = 'order';

export interface OrderState {
  data: any;
  error: any;
  status: string;
}

export const initialState: OrderState = {
  data: {},
  error: {},
  status: INITIALIZE
};

export const reducer = createReducer(
  initialState,

  // CREATE
  on(createOrder, (state, payload) => {
    return {
      ...state,
      status: LOADING,
    }
  }),
  on(createOrderSuccess, (state, payload) => {
    let results = state?.data?.results ? state?.data?.results : [];
    
    return {
      ...state,
      data: {
        ...state.data,
        retrieve: payload.data,
        results: [payload.data, ...results],
      },
      status: LOADED,
    }
  }),

  // RETRIEVE
  on(retrieveOrder, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        retrieve: {}
      }
    }
  }),
  on(retrieveOrderSuccess, (state, payload) => {
    let copiedItems = [...payload.data.meta._order_items];
    let subtotal = copiedItems.reduce((acc, val) => {
      return acc + val.subtotal;
    }, 0);

    return {
      ...state,
      data: {
        ...state.data,
        retrieve: {
          ...payload.data,
          subtotal: subtotal,
          total: subtotal + payload.data.meta._order_shopper_fee,
        }
      }
    }
  }),

  // LOADS
  on(loadOrders, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data
      },
      status: LOADING,
    }
  }),
  on(loadOrdersSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        results: payload.data,
      },
      status: LOADED,
    }
  }),

  // UPDATE
  on(updateOrder, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
      }
    }
  }),
  on(updateOrderSuccess, (state, payload) => {
    let results = state?.data?.results;
    let newResults = [];
    let index = results?.findIndex((d: any) => {
      return d.id == payload.data.id;
    });

    if (results?.length > 0) {
      newResults = [
        ...state.data?.results?.slice(0, index),
        {
          ...state.data?.results?.[index],
          ...payload.data,
        },
        ...state.data?.results?.slice(index + 1)
      ];
    }

    return {
      ...state,
      data: {
        ...state.data,
        retrieve: {
          ...state.data.retrieve,
          meta: {
            ...state.data.retrieve.meta,
            _order_status: payload.data.meta._order_status,
          }
        },
        results: newResults,
      }
    }
  })
);
export function OrderReducer(state: OrderState, action: Action) {
  return reducer(state, action)
}