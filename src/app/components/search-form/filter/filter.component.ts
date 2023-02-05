import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, } from 'rxjs';
import { changeFilters } from 'src/app/state/ads.actions';
import { selectFilters, AdsState } from 'src/app/state/ads.selectors';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent {

  @Input() status!: string;

  filters$ = this.store.select(selectFilters)

  filter$ = this.filters$
  .pipe(
    map(filters => filters.includes(this.status))
  );

  constructor(private store: Store<AdsState>) {}

  changeFilters(filters: string[]) {
    this.store.dispatch(changeFilters({filters}))
  }

}
