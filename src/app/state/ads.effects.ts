import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, tap, mergeMap, catchError } from 'rxjs/operators';
import { AdService } from '../services/ad.service';
import { createAd, createAdFail, CreateAdProps, createAdSuccess, fetchAds, fetchAdsFail, FetchAdsProps, fetchAdsSuccess, updateAd, updateAdFail, UpdateAdProps, updateAdSuccess } from './ads.actions';
 
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
    mergeMap(({id,changed}: UpdateAdProps) => this.adService.updateAd(id,changed)
      .pipe(
        map(() => {
          /* Kinda clunky, but this lowers the amount of refetching */
          const isAdsRoute = this.router.url.includes('/ads');
          if(!isAdsRoute) {
            return { type: updateAdSuccess.type, id,changed, loading: true }
          }

          const queryMap = this.route.snapshot.queryParamMap;
          const search = queryMap.get('search');
          const filters = queryMap.get('filters');

          if(search || filters) {
            return {
              type: fetchAds.type,
              searchTerm: search ?? '',
              filters: filters?.split(',') ?? [],
              pageSize: +(queryMap.get('pageSize') ?? 1),
              pageNumber: +(queryMap.get('pageNumber') ?? 5)
            }
          }

          return { type: updateAdSuccess.type, id,changed, loading: false }

        }),
        tap(() => this.router.navigate(['ads'], {queryParamsHandling: 'merge'})),
        catchError(() => of({ type: updateAdFail.type}))
      ))
    )
  );

  createAd$ = createEffect(() => this.actions$.pipe(
    ofType(createAd.type),
    mergeMap(({ad}: CreateAdProps) => this.adService.addNewAd(ad)
      .pipe(
        map(({id}) => ({ type: createAdSuccess.type, ad: {...ad, id}})),
        tap(() => this.router.navigateByUrl('/ads')),
        catchError(() => of({ type: createAdFail.type}))
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private adService: AdService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}