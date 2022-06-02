import { AppState } from '@capacitor/app';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const userFeatureKey = createFeatureSelector<AppState>('user');
export const selectUser = createSelector(
	userFeatureKey,
	(state: any) => {
		return state;
  	}
);

export const selectRetrievedUser = createSelector(
	userFeatureKey,
	(state: any) => {
		return state;
  	}
);