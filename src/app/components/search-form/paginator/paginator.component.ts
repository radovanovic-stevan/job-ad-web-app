import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { changePageNumber, changePageSize } from 'src/app/state/ads.actions';
import { selectPageNumber, selectPageSize, selectAdsSize, AdsState } from 'src/app/state/ads.selectors';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {

  pageNumber$ = this.store.select(selectPageNumber)
  .pipe(
    filter(elem => !!elem)
  );

  pageSize$ = this.store.select(selectPageSize)
  .pipe(
    filter(elem => !!elem)
  );

  adsSize$ = this.store.select(selectAdsSize)
  .pipe(
    filter(elem => !!elem)
  );

  constructor(private store: Store<AdsState>) {}

  changePage(event: PageEvent) {
    this.store.dispatch(changePageNumber({pageNumber: (event.pageIndex)+1}));
    this.store.dispatch(changePageSize({pageSize: event.pageSize}));
  }

}
