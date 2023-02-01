import { createAction } from '@ngrx/store';

export const fetchAds = createAction('[Ads] Fetch Ads');
export const fetchAdsSuccess = createAction('[Ads] Fetch Ads Success');
export const fetchAdsFail = createAction('[Ads] Fetch Ads Fail');