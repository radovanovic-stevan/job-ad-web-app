import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';
import { JobAd } from '../interfaces/job-ad.interface';
import { AdService } from '../services/ad.service';
import { createAd, createAdFail, CreateAdProps, createAdSuccess, fetchAds, fetchAdsFail, FetchAdsProps, fetchAdsSuccess, updateAd, updateAdFail, updateAdSuccess } from './ads.actions';
 
@Injectable()
export class AdsEffects {
 
  fetchAds$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAds.type),
    mergeMap((props: FetchAdsProps) => this.adService.getAllAds(props)
      .pipe(
        map(({jobs, length}) => ({ type: fetchAdsSuccess.type, jobs,length })),
        catchError(() => of({ type: fetchAdsFail.type}))
      ))
    )
  );

  updateAd$ = createEffect(() => this.actions$.pipe(
    ofType(updateAd.type),
    mergeMap(({id,changed}) => this.adService.updateAd(id,changed)
      .pipe(
        map(() => ({ type: updateAdSuccess.type, id,changed })),
        tap(() => this.router.navigateByUrl('/ads')),
        catchError(() => of({ type: updateAdFail.type}))
      ))
    )
  );

  createAd$ = createEffect(() => this.actions$.pipe(
    ofType(createAd.type),
    mergeMap(({ad}: CreateAdProps) => this.adService.addNewAd(ad)
      .pipe(
        map((id) => ({ type: createAdSuccess.type, ad: {...ad, id}})),
        tap(() => this.router.navigateByUrl('/ads')),
        catchError(() => of({ type: createAdFail.type}))
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private adService: AdService,
    private router: Router
  ) {}
}