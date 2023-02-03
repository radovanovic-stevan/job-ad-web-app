import { createReducer, on } from '@ngrx/store';
import { fetchAdsFail, fetchAdsSuccess, fetchAds, updateAd, updateAdFail, updateAdSuccess } from './ads.actions';
import { AdsState } from './ads.selectors';

export const initialState: AdsState = {
    ads: [],
    loading: false,
    errorMessage: "",
    successMessage: ""
};

function newState(state: AdsState): AdsState {
  return {
    ads: JSON.parse(JSON.stringify(state.ads)),
    loading: state.loading,
    errorMessage: state.errorMessage,
    successMessage: state.successMessage
  }
}

export const adsReducer = createReducer(
  initialState,
  // TODO: LOADING
  on(fetchAds, (state) => ({...state, loading: true})),
  on(fetchAdsSuccess, (state,{ads}) => ({...newState(state), ads, loading: false, successMessage: "Successfully fetched ads"})),
  on(fetchAdsFail, (state) => ({...newState(state), errorMessage: "Something went wrong while fetching ads", ads: [], loading: false})),
  on(updateAd,(state) => ({...state, loading: true})),
  on(updateAdSuccess, (state,{id,changed}) => {
      const deepCopyState = newState(state);
      const index = deepCopyState.ads.findIndex(elem => elem.id === id);
      deepCopyState.ads[index] = {...deepCopyState.ads[index], ...changed};
      deepCopyState.loading = false;
      deepCopyState.successMessage = "Successfully updated ad"
      return deepCopyState;
    }
  ),
  on(updateAdFail,(state) => ({...newState(state), errorMessage: "Something went wrong while updating the ad", loading: false})),
);