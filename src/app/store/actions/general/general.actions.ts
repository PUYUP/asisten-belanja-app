import { createAction, props } from '@ngrx/store';

export const loadPosts = createAction(
  '[General] Load Posts'
);
export const loadPostsSuccess = createAction(
  '[General] Load Posts Success',
  props<{ data: any }>()
);