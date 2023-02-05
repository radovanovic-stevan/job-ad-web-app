import { createReducer, on } from '@ngrx/store';
import { JobAd } from '../interfaces/job-ad.interface';
import {
  fetchAdsFail,
  fetchAdsSuccess,
  fetchAds,
  updateAd,
  updateAdFail,
  updateAdSuccess,
  createAd,
  createAdFail,
  createAdSuccess,
  clearMessages,
  changeFilters,
  changePageSize,
  changePageNumber,
} from './ads.actions';
import { AdsState } from './ads.selectors';

export const initialState: AdsState = {
    ads: [],
    loading: false,
    errorMessage: "",
    successMessage: "",
    filters: [],
    pageNumber: 0,
    pageSize: 0,
    adsSize: 0
};

export const adsReducer = createReducer(
  initialState,
  on(fetchAds, (state) => ({...state, loading: true})),
  on(fetchAdsSuccess, (state,{jobs,length}) => {
    const deepCopyState = {...state, ads: JSON.parse(JSON.stringify(state.ads)) as JobAd[]};
    deepCopyState.ads = jobs;
    deepCopyState.adsSize = length;
    deepCopyState.loading = false;
    deepCopyState.successMessage = "Successfully fetched ads 🎉";
    return deepCopyState;
  }),
  on(fetchAdsFail, (state) => {
    const deepCopyState = {...state, ads: JSON.parse(JSON.stringify(state.ads)) as JobAd[]};
    deepCopyState.ads = [];
    deepCopyState.loading = false;
    deepCopyState.adsSize = 0;
    deepCopyState.successMessage = "Something went wrong while fetching ads 😭";
    return deepCopyState;
  }),
  on(updateAd,(state) => ({...state, loading: true})),
  on(updateAdSuccess, (state,{id,changed, loading}) => {
      const deepCopyState = {...state, ads: JSON.parse(JSON.stringify(state.ads)) as JobAd[]};
      const index = deepCopyState.ads.findIndex(elem => elem.id === id);
      deepCopyState.ads[index] = {...deepCopyState.ads[index], ...changed};
      deepCopyState.loading = loading;
      deepCopyState.successMessage = "Successfully updated ad 🎉"
      return deepCopyState;
    }
  ),
  on(updateAdFail,(state) => ({...state, errorMessage: "Something went wrong while updating the ad 😭", loading: false})),
  on(createAd, (state) => ({...state, loading: true})),
  on(createAdSuccess, (state,{ad}) => {
    const deepCopyState = {...state, ads: JSON.parse(JSON.stringify(state.ads)) as JobAd[]};
    deepCopyState.ads.unshift(ad);
    deepCopyState.successMessage = "Successfully created an ad 🎉"
    return deepCopyState;
  }),
  on(createAdFail, (state) => ({...state, errorMessage: "An ad with that title already exists", loading: false})),
  on(clearMessages, (state) => ({...state, errorMessage: "", successMessage: ""})),
  on(changeFilters, (state,{filters}) => {
    let newFilters = [...state.filters];
      if(newFilters.includes(filters[0])) {
        newFilters = newFilters.filter(elem => !filters.includes(elem))
      } else {
        newFilters.push(...filters);
      }
      return {...state, filters: newFilters}
  }),
  on(changePageSize, (state,{pageSize}) => ({...state, pageSize})),
  on(changePageNumber, (state,{pageNumber}) => ({...state, pageNumber}))
);