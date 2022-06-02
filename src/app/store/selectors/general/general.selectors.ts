import { AppState } from '@capacitor/app';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const generalFeatureKey = createFeatureSelector<AppState>('general');
export const selectPosts = createSelector(
	generalFeatureKey,
	(state: any) => {
		return state?.posts;
  	}
);