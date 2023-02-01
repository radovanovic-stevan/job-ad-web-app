import { createReducer, on } from '@ngrx/store';
import { fetchAds, fetchAdsFail, fetchAdsSuccess } from './ads.actions';
import { AdsState } from './ads.selectors';

export const initialState: AdsState = {
    ads: [],
    loading: false
};

export const adsReducer = createReducer(
  initialState,
  on(fetchAds, (state) => state),
  on(fetchAdsFail, (state) => state),
  on(fetchAdsSuccess, (state) => state)
);