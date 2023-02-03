import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { merge, tap } from 'rxjs';
import { fetchAds } from './state/ads.actions';
import { AppState, selectErrorMessage, selectLoading, selectSuccessMessage } from './state/ads.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  loading$ = this.store.select(selectLoading);

  messages$ = merge(this.store.select(selectErrorMessage),this.store.select(selectSuccessMessage))
  .subscribe(msg => {if(msg) this._snackBar.open(
    msg,undefined,{duration: 1500}
  )})

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.store.dispatch(fetchAds());
  }

  ngOnDestroy(): void {
    this.messages$.unsubscribe();
  }


}
