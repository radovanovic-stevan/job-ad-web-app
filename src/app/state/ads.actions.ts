import { createAction, props } from '@ngrx/store';
import { JobAd } from '../interfaces/job-ad.interface';

export const fetchAds = createAction('[Ads] Fetch Ads',props<FetchAdsProps>());
export const fetchAdsSuccess = createAction('[Ads] Fetch Ads Success',props<FetchAdsSuccessProps>());
export const fetchAdsFail = createAction('[Ads] Fetch Ads Fail');
export const updateAd = createAction('[Ads] Update Ad',props<UpdateAdProps>());
export const updateAdSuccess = createAction('[Ads] Update Ad Success',props<UpdateAdSuccessProps>());
export const updateAdFail = createAction('[Ads] Update Ad Fail');
export const createAd = createAction('[Ads] Create Ad',props<CreateAdProps>());
export const createAdSuccess = createAction('[Ads] Create Ad Success',props<CreateAdSuccessProps>());
export const createAdFail = createAction('[Ads] Create Ad Fail');
export const clearMessages = createAction('[Ads] Clear Messages');
export const changeFilters = createAction('[Ads] Change Filters',props<ChangeFilterActionProps>());
export const changePageNumber = createAction('[Ads] Change Page Number',props<ChangePageNumberProps>());
export const changePageSize = createAction('[Ads] Change Page Size',props<ChangePageSizeProps>());


export type FetchAdsProps = {
    searchTerm?: string;
    filters?: string[];
    pageSize: number;
    pageNumber: number;
}

export type FetchAdsSuccessProps = {
    jobs: JobAd[];
    length: number;
}

export type UpdateAdProps = {
    id: number;
    changed: Partial<JobAd>;
}

export type UpdateAdSuccessProps = {
    id: number;
    changed: Partial<JobAd>;
}

export type CreateAdProps = {
    ad: Omit<JobAd, "id">;
}

export type CreateAdSuccessProps = {
    ad: JobAd;
}

export type ChangeFilterActionProps = {
    filters: string[];
}

export type ChangePageNumberProps = {
    pageNumber: number;
}

export type ChangePageSizeProps = {
    pageSize: number;
}