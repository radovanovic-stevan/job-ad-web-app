import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap, debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import { changeSearchTerm } from 'src/app/state/ads.actions';
import { AdsState, selectSearchTerm } from 'src/app/state/ads.selectors';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFieldComponent implements OnInit, OnDestroy {

    searchInput = new FormControl('');
    sub!: Subscription;

    searchFromState$ = this.store.select(selectSearchTerm)
    .pipe(
      filter(searchTerm => searchTerm !== this.searchInput.value),
      tap(searchTerm => this.searchInput.setValue(searchTerm))
    )

    searchInput$ = this.searchInput.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(searchTerm => this.store.dispatch(changeSearchTerm({searchTerm: searchTerm ?? ''})))
    );

    constructor(private store: Store<AdsState>) {}

    ngOnInit(): void {
      this.sub = this.searchInput$.subscribe();
    }

    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }
  
}
