import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AppState, selectAds } from 'src/app/state/ads.selectors';
import { jobAds } from 'temp/datasource';

@Component({
  selector: 'app-ad-list',
  templateUrl: './ad-list.component.html',
  styleUrls: ['./ad-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdListComponent {

  ads$ = this.store.select(selectAds).pipe(tap((ads) => console.log(ads)));

  constructor(private store: Store<AppState>) {}
  

}
