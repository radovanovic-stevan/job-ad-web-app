import { createAction, props } from '@ngrx/store';
import { JobAd } from '../interfaces/job-ad.interface';

export const fetchAds = createAction('[Ads] Fetch Ads');
export const fetchAdsSuccess = createAction('[Ads] Fetch Ads Success',props<{ ads: JobAd[] }>());
export const fetchAdsFail = createAction('[Ads] Fetch Ads Fail');