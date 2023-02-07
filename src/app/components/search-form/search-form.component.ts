import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, distinctUntilChanged, filter, skipWhile, Subscription, tap } from 'rxjs';
import { changeFilters, changePageNumber, changePageSize, changeSearchTerm, fetchAds } from 'src/app/state/ads.actions';
import { AdsState, selectFilters, selectPageNumber, selectPageSize, selectSearchTerm } from 'src/app/state/ads.selectors';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit,OnDestroy {

  subscription!: Subscription;
  noFetching: boolean = false;

  constructor(
    private store: Store<AdsState>, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  filters$ = this.store.select(selectFilters)
  .pipe(
    distinctUntilChanged((prev,curr) => prev.length === curr.length),
  )

  pageNumber$ = this.store.select(selectPageNumber)
  .pipe(
    filter(elem => !!elem)
  );

  pageSize$ = this.store.select(selectPageSize)
  .pipe(
    filter(elem => !!elem)
  );

  searchInput$ = this.store.select(selectSearchTerm);

  ngOnInit() {
    this.initializeQueryParams();
    this.setUpSubscriptions();
  }

  setUpSubscriptions() {
    this.subscription = combineLatest([this.searchInput$,this.filters$,this.pageNumber$,this.pageSize$])
    .pipe(
      tap(([searchInputValue,filters,pageNumber,pageSize]) => {
        this.changeQueryParams(searchInputValue,filters,pageNumber,pageSize);
        if(this.noFetching) {
          this.noFetching = false;
          return;
        }
        this.store.dispatch(
          fetchAds({pageSize, pageNumber, searchTerm: searchInputValue ?? undefined, filters})) 
      })
    )
    .subscribe()
  }

  changeQueryParams(searchInputValue: string | null, filters: string[], pageNumber: number, pageSize: number) {
    const queryParams: Params = {};
    if(searchInputValue) queryParams['search'] = searchInputValue;
    if(filters?.length > 0) queryParams['filters'] = filters.join(',');
    if(pageSize) queryParams['pageSize'] = pageSize;
    if(pageNumber) queryParams['pageNumber'] = pageNumber;
    this.router.navigate(['.'],{
      relativeTo: this.route,
      queryParams,       
      skipLocationChange: false
    })
  }

  initializeQueryParams() {
    const queryMap = this.route.snapshot.queryParamMap;
    const search = queryMap.get('search');
    const filters = queryMap.get('filters')?.split(',');
    const pageNumber = +queryMap.get('pageNumber')!;
    const pageSize = +queryMap.get('pageSize')!;

    this.noFetching = !!queryMap.get('noFetching')
    
    if(search) {
      this.store.dispatch(changeSearchTerm({searchTerm: search}));
    }

    if(filters) {
      this.changeFilters(filters);
    }

    this.store.dispatch(changePageNumber({pageNumber: pageNumber || 1})); 
    this.store.dispatch(changePageSize({pageSize: pageSize || 5}));

  }

  changeFilters(filters: string[]) {
    this.store.dispatch(changeFilters({filters}))
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
