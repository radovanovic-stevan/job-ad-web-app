import { createAction, props } from '@ngrx/store';
import { JobAd } from '../interfaces/job-ad.interface';

export const fetchAds = createAction('[Ads] Fetch Ads');
export const fetchAdsSuccess = createAction('[Ads] Fetch Ads Success',props<{ ads: JobAd[] }>());
export const fetchAdsFail = createAction('[Ads] Fetch Ads Fail');
export const updateAd = createAction('[Ads] Update Ad',props<{ id: number, changed: Partial<JobAd> }>());
export const updateAdSuccess = createAction('[Ads] Update Ad Success',props<{ id: number, changed: Partial<JobAd> }>());
export const updateAdFail = createAction('[Ads] Update Ad Fail');
export const createAd = createAction('[Ads] Create Ad',props<{ad: Omit<JobAd, "id">}>());
export const createAdSuccess = createAction('[Ads] Create Ad Success',props<{ad: JobAd}>());
export const createAdFail = createAction('[Ads] Create Ad Fail');