import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, merge } from 'rxjs';
import { clearMessages } from './state/ads.actions';
import { AppState, selectErrorMessage, selectLoading, selectSuccessMessage } from './state/ads.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  loading$ = this.store.select(selectLoading);

  messagesSubscription = merge(this.store.select(selectErrorMessage),this.store.select(selectSuccessMessage))
  .subscribe(msg => {
    if(!msg) return;
    this._snackBar.open(msg,undefined,{duration: 1500});
    this.store.dispatch(clearMessages())
  })

  routerSubscription = this.router.events
  .pipe(
    filter(event => event instanceof NavigationStart && event.id === 1 && !event.url.includes('/ads'))
  )
  .subscribe(() => this.router.navigateByUrl('/ads'));

  constructor(private store: Store<AppState>, private _snackBar: MatSnackBar, private router: Router) {}

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }


}
