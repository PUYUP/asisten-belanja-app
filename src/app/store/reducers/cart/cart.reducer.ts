import { Action, createReducer, on } from '@ngrx/store';
import * as statuses from '../../../utils/statuses';
import {
  addItemToCart,
  addItemToCartSuccess,
  createCart,
  createCartSuccess,
  deleteItemCart,
  loadCarts,
  loadCartsSuccess,
  resetCart,
  retrieveCart,
  retrieveCartSuccess,
  updateCart,
  updateCartSuccess,
  updateItemCart,
  updateItemCartSuccess
} from '../../actions/cart/cart.actions';

export const cartFeatureKey = 'cart';

export interface CartState {
  data: any;
  error: any;
  status: string;
}

export const initialState: CartState = {
  data: {},
  error: {},
  status: statuses.INITIALIZE,
};

export const reducer = createReducer(
  initialState,

  on(createCart, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data
      },
      status: statuses.LOADING
    }
  }),
  on(createCartSuccess, (state, payload) => {
    let items = state?.data?.items ? state?.data?.items : [];

    return {
      ...state,
      data: {
        ...state.data,
        items: [...items, payload.data]
      },
      status: statuses.LOADED
    }
  }),

  // ADD ITEM
  on(addItemToCart, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data
      },
      status: statuses.LOADING
    }
  }),
  on(addItemToCartSuccess, (state, payload) => {
    let [latesItem] = payload?.data?.meta?._cart_items?.slice(-1);

    return {
      ...state,
      data: {
        ...state.data,
        retrieve: {
          ...state?.data?.retrieve,
          meta: {
            ...state?.data?.retrieve?.meta,
            _cart_items: [
              ...state?.data?.retrieve?.meta?._cart_items,
              latesItem,
            ],
          }
        }
      },
      status: statuses.LOADED
    }
  }),

  // UPDATE ITEM
  on(updateItemCart, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data
      }
    }
  }),
  on(updateItemCartSuccess, (state, payload) => {
    let index = payload.data.index;
    let cartItem = payload.data.cart_item;

    return {
      ...state,
      data: {
        ...state.data,
        retrieve: {
          ...state.data.retrieve,
          meta: {
            ...state.data.retrieve.meta,
            _cart_items: [
              ...state.data.retrieve.meta._cart_items.slice(0, index),
              {
                ...state.data.retrieve.meta._cart_items[index],
                ...cartItem
              },
              ...state.data.retrieve.meta._cart_items.slice(index + 1),
            ]
          }
        }
      }
    }
  }),

  // DELETE ITEM
  on(deleteItemCart, (state, payload) => {
    let items = state.data.retrieve.meta._cart_items;
    let copiedItems = [...items];
    let index = items.findIndex((d: any) => d.name == payload?.data?.cart_item?.name && d.quantity == payload?.data?.cart_item?.quantity);

    copiedItems.splice(index, 1);

    return {
      ...state,
      data: {
        ...state.data,
        retrieve: {
          ...state.data.retrieve,
          meta: {
            ...state.data.retrieve.meta,
            _cart_items: [
              ...copiedItems,
            ]
          }
        }
      }
    }
  }),

  // LOADS
  on(loadCarts, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
      },
      status: statuses.LOADING,
    }
  }),
  on(loadCartsSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...payload.data,
      },
      status: statuses.LOADED,
    }
  }),

  // RETRIEVE
  on(retrieveCart, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
      },
      status: statuses.LOADING,
    }
  }),
  on(retrieveCartSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        retrieve: {
          ...payload.data,
        }
      },
      status: statuses.LOADED,
    }
  }),

  // UPDATE CART
  on(updateCart, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
      }
    }
  }),
  on(updateCartSuccess, (state, payload) => {
    let copiedMeta = { ...payload?.data?.meta };
    delete copiedMeta['_cart_items'];

    return {
      ...state,
      data: {
        ...state.data,
        retrieve: {
          ...state.data.retrieve,
          meta: {
            ...state.data.retrieve.meta,
            ...copiedMeta,
          }
        }
      }
    }
  }),

  // RESET
  on(resetCart, () => {
    return {
      data: {},
      error: {},
      status: statuses.INITIALIZE,
    }
  })
);

export function CartReducer(state: CartState, action: Action) {
  return reducer(state, action);
}