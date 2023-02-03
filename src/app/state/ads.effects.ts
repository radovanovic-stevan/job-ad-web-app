import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AdService } from '../services/ad.service';
import { fetchAds, fetchAdsFail, fetchAdsSuccess, updateAd, updateAdFail, updateAdSuccess } from './ads.actions';
 
@Injectable()
export class AdsEffects {
 
  fetchAds$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAds.type),
    mergeMap(() => this.adService.getAllAds()
      .pipe(
        map(ads => ({ type: fetchAdsSuccess.type, ads })),
        catchError(() => of({ type: fetchAdsFail.type}))
      ))
    )
  );

  updateAd$ = createEffect(() => this.actions$.pipe(
    ofType(updateAd.type),
    mergeMap(({id,changed}) => this.adService.updateAd(id,changed)
      .pipe(
        map(({id,changed}) => ({ type: updateAdSuccess.type, id,changed })),
        catchError(() => of({ type: updateAdFail.type}))
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private adService: AdService
  ) {}
}