import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AdService } from '../services/ad.service';
 
@Injectable()
export class AdsEffects {
 
  loadMovies$ = createEffect(() => this.actions$.pipe(
    ofType('[Ads] Fetch Ads'),
    mergeMap(() => this.adService.getAllAds()
      .pipe(
        map(ads => ({ type: '[Ads] Fetch Ads Success', ads })),
        catchError(() => of({ type: '[Ads] Fetch Ads Fail'}))
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private adService: AdService
  ) {}
}