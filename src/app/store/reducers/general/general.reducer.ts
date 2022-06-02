import { Action, createReducer, on } from '@ngrx/store';
import { loadPosts, loadPostsSuccess } from '../../actions/general/general.actions';


export const generalFeatureKey = 'general';

export interface GeneralState {
  posts: any;
}

export const initialState: GeneralState = {
  posts: [],
};

export const reducer = createReducer(
  initialState,

  on(loadPosts, (state, payload) => {
    return {
      ...state
    }
  }),
  on(loadPostsSuccess, (state, payload) => {
    return {
      ...state,
      posts: payload.data,
    }
  }),
);
export function GeneralReducer(state: GeneralState, action: Action) {
  return reducer(state, action);
}