import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { JobAd } from 'src/app/job-ad.interface';
import { updateAd } from 'src/app/state/ads.actions';
import { AdsState } from 'src/app/state/ads.selectors';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdCardComponent {

  @Input() jobAd!: JobAd;

  constructor(private store: Store<AdsState>) {}

  publishAd(id: number) {
    this.store.dispatch(updateAd({id,changed: {status: 'published'}}))
  }

  archiveAd(id: number) {
    this.store.dispatch(updateAd({id,changed: {status: 'archived'}}))
  }

}
