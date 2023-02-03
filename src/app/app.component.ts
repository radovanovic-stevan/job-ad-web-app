import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchAds } from './state/ads.actions';
import { AppState, selectLoading } from './state/ads.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading$ = this.store.select(selectLoading);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(fetchAds());
  }

}
