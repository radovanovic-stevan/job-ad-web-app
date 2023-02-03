import { createFeatureSelector, createSelector } from "@ngrx/store";
import { JobAd } from "../interfaces/job-ad.interface";

export interface AdsState {
    ads: JobAd[],
    loading: boolean;
    errorMessage: string;
    successMessage: string;
}
   
export interface AppState {
    adsSlice: AdsState;
}

export const selectAdsFeature = createFeatureSelector<AdsState>('ads');

export const selectAds = createSelector(
    selectAdsFeature,
    (state: AdsState) => state.ads
);

export const selectLoading = createSelector(
    selectAdsFeature,
    (state: AdsState) => state.loading
);

export const selectErrorMessage = createSelector(
    selectAdsFeature,
    (state: AdsState) => state.errorMessage
);

export const selectSuccessMessage = createSelector(
    selectAdsFeature,
    (state: AdsState) => state.successMessage
);
