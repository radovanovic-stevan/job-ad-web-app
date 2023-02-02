import { Component, Input } from '@angular/core';
import { JobAd } from 'src/app/interfaces/job-ad.interface';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss']
})
export class AdCardComponent {

  @Input() jobAd!: JobAd;

}
