import { createReducer, on } from '@ngrx/store';
import { fetchAdsFail, fetchAdsSuccess, fetchAds } from './ads.actions';
import { AdsState } from './ads.selectors';

export const initialState: AdsState = {
    ads: [],
    loading: false,
    errorMessage: ""
};

export const adsReducer = createReducer(
  initialState,
  // TODO: LOADING, STATE IMMUTABILITY
  on(fetchAds, (state) => ({...state, loading: true})),
  on(fetchAdsSuccess, (state,{ads}) => ({...state, ads, loading: false})),
  on(fetchAdsFail, (state) => ({...state, errorMessage: "Something went wrong while fetching ads", loading: false}))
);