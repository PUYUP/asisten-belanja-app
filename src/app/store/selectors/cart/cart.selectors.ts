import { AppState } from '@capacitor/app';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const cartFeatureKey = createFeatureSelector<AppState>('cart');
export const selectRetrievedCart = createSelector(
	cartFeatureKey,
	(state: any) => {
		return state?.data?.retrieve;
  	}
);