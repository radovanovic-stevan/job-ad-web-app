import { createFeatureSelector, createSelector } from "@ngrx/store";
import { JobAd } from "../interfaces/job-ad.interface";

export interface AdsState {
    ads: JobAd[],
    loading: boolean;
    errorMessage: string;
    successMessage: string;
    filters: string[];
    pageNumber: number;
    pageSize: number;
    adsSize: number;
    searchTerm: string;
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

export const selectFilters = createSelector(
    selectAdsFeature,
    (state: AdsState) => state.filters
);

export const selectPageNumber = createSelector(
    selectAdsFeature,
    (state: AdsState) => state.pageNumber
);

export const selectPageSize = createSelector(
    selectAdsFeature,
    (state: AdsState) => state.pageSize
);

export const selectAdsSize = createSelector(
    selectAdsFeature,
    (state: AdsState) => state.adsSize
);

export const selectSearchTerm = createSelector(
    selectAdsFeature,
    (state: AdsState) => state.searchTerm
);

export const selectAdById = (id: number | null) =>
createSelector(
    selectAdsFeature,
    (state: AdsState) => state.ads.find(elem => elem.id === id)
  );
