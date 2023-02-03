import { createReducer, on } from '@ngrx/store';
import { fetchAdsFail, fetchAdsSuccess, fetchAds, updateAd, updateAdFail, updateAdSuccess } from './ads.actions';
import { AdsState } from './ads.selectors';

export const initialState: AdsState = {
    ads: [],
    loading: false,
    errorMessage: ""
};

function newState(state: AdsState): AdsState {
  return {
    ads: JSON.parse(JSON.stringify(state.ads)),
    loading: state.loading,
    errorMessage: state.errorMessage
  }
}

export const adsReducer = createReducer(
  initialState,
  // TODO: LOADING
  on(fetchAds, (state) => ({...state, loading: true})),
  on(fetchAdsSuccess, (state,{ads}) => ({...newState(state), ads, loading: false})),
  on(fetchAdsFail, (state) => ({...newState(state), errorMessage: "Something went wrong while fetching ads", loading: false})),
  on(updateAd,(state) => ({...state, loading: true})),
  on(updateAdSuccess, (state,{id,changed}) => {
      const deepCopyState = newState(state);
      const index = deepCopyState.ads.findIndex(elem => elem.id === id);
      deepCopyState.ads[index] = {...deepCopyState.ads[index], ...changed};
      deepCopyState.loading = false;
      return deepCopyState;
    }
  ),
  on(updateAdFail,(state) => ({...newState(state), errorMessage: "Something went wrong while updating the ad", loading: false})),
);