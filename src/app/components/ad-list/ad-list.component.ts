import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AppState, selectAds, selectLoading } from 'src/app/state/ads.selectors';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdListComponent {

  ads$ = this.store.select(selectAds);

  constructor(private store: Store<AppState>) {}
  

}
