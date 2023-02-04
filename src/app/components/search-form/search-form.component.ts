import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime, distinctUntilChanged, map, skip, startWith, Subscription, tap } from 'rxjs';
import { changeFilters, fetchAds } from 'src/app/state/ads.actions';
import { AdsState, selectFilters } from 'src/app/state/ads.selectors';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit,OnDestroy {

  searchInput = new FormControl('');
  subscription!: Subscription;

  constructor(private store: Store<AdsState>, private router: Router, private route: ActivatedRoute) {}

  filters$ = this.store.select(selectFilters)
  .pipe(
    distinctUntilChanged((prev,curr) => prev.length === curr.length),
  )

  draftFilter$ = this.filters$
  .pipe(
    map(filters => filters.includes('draft'))
  );

  publishedFilter$ = this.filters$
  .pipe(
    map(filters => filters.includes('published'))
  );

  archivedFilter$ = this.filters$
  .pipe(
    map(filters => filters.includes('archived'))
  );

  // TODO: SWITCH MAP maybe
  searchInput$ = this.searchInput.valueChanges
  .pipe(
    startWith(this.route.snapshot.queryParamMap.get('search') ?? ''),
    debounceTime(400),
    distinctUntilChanged(),
  );

  ngOnInit() {
    this.initializeQueryParams();
    this.setUpSubscriptions();
  }

  setUpSubscriptions() {
    this.subscription = combineLatest([this.searchInput$,this.filters$])
    .pipe(
      tap(([searchInputValue,filters]) => {
        this.changeQueryParams(searchInputValue,filters);
        this.store.dispatch(
          fetchAds({pageSize: 4, pageNumber: 1, searchTerm: searchInputValue ?? undefined, filters})) 
      })
    )
    .subscribe()
  }

  changeQueryParams(searchInputValue: string | null, filters: string[]) {
    const queryParams: Params = {};
    if(searchInputValue) queryParams['search'] = searchInputValue;
    if(filters?.length > 0) queryParams['filters'] = filters.join(',');
    this.router.navigate(['.'],{
      relativeTo: this.route,
      queryParams,       
      skipLocationChange: false
    })
  }

  initializeQueryParams() {
    const queryMap = this.route.snapshot.queryParamMap;
    const search = queryMap.get('search');
    const filters = queryMap.get('filters')?.split(',')

    if(search) {
      this.searchInput.setValue(search);
    }

    if(filters) {
      this.changeFilters(filters);
    }

  }

  changeFilters(filters: string[]) {
    this.store.dispatch(changeFilters({filters}))
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
