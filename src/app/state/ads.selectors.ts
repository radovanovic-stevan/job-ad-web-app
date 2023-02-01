import { createFeatureSelector, createSelector } from "@ngrx/store";
import { JobAd } from "../interfaces/job-ad.interface";

export interface AdsState {
    ads: JobAd[],
    loading: boolean;
}
   
export interface AppState {
    feature: AdsState;
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
