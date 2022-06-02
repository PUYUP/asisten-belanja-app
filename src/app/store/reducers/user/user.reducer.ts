import { Action, createReducer, on } from '@ngrx/store';

import * as statuses from '../../../utils/statuses';
import {
  retrieveUser,
  retrieveUserSuccess,
  updateUser,
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

export const userFeatureKey = 'user';

export interface UserState {
  data: any;
  error: any;
  status: string;
}

export const initialState: UserState = {
  data: {},
  error: {},
  status: statuses.INITIALIZE,
};

export const reducer = createReducer(
  initialState,

  on(userSignup, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...payload.data,
      },
      status: statuses.LOADING,
    }
  }),
  on(userSignupSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...payload.data,
      },
      status: statuses.LOADED,
    }
  }),
  on(userSignupFailure, (state, payload) => {
    return {
      ...state,
      error: payload.error,
      status: statuses.INITIALIZE,
    }
  }),

  // SIGNIN
  on(userSignin, (state, payload) => {
    return {
      ...state,
      status: statuses.LOADING
    }
  }),
  on(userSigninSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...payload.data
      },
      status: statuses.LOADED
    }
  }),
  on(userSigninFailure, (state, payload) => {
    return {
      ...state,
      data: {},
      error: payload.error,
      status: statuses.INITIALIZE,
    }
  }),

  // RETRIEVE
  on(retrieveUser, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
      },
    }
  }),
  on(retrieveUserSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...payload.data,
      },
      status: statuses.LOADED,
    }
  }),

  // UPDATE
  on(updateUser, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
      },
    }
  }),
  on(updateUserSuccess, (state, payload) => {
    return {
      ...state,
      data: {
        ...state.data,
        ...payload.data,
      }
    }
  }),

  // SIGNOUT
  on(userSignout, (state) => {
    return {
      ...state,
      data: {
        ...state.data,
      }
    }
  }),
  on(userSignoutSuccess, (state) => {
    return {
      ...state,
      data: {},
      error: {},
      status: statuses.INITIALIZE,
    }
  }),
);

export function UserReducer(state: UserState, action: Action) {
  return reducer(state, action);
}