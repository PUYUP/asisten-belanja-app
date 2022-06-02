import { AppState } from '@capacitor/app';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const orderFeatureKey = createFeatureSelector<AppState>('order');
export const selectRetrievedOrder = createSelector(
	orderFeatureKey,
	(state: any) => {
		return state?.data?.retrieve;
  	}
);

export const selectOrders = createSelector(
	orderFeatureKey,
	(state: any) => {
		return state;
  	}
);