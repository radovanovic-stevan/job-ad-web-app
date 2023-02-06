import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdListComponent } from './components/ad-list/ad-list.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/ui/header/header.component';
import { adsReducer } from './state/ads.reducer';
import { AdCardComponent } from './components/ad-card/ad-card.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { AdsEffects } from './state/ads.effects';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { FilterComponent } from './components/search-form/filter/filter.component';
import { PaginatorComponent } from './components/search-form/paginator/paginator.component';
import { SearchFieldComponent } from './components/search-form/search-field/search-field.component';
import { HttpClientModule } from '@angular/common/http';
// TODO: Add Can Deactivate for Form
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AdListComponent,
    HeaderComponent,
    AdCardComponent,
    SearchFormComponent,
    JobFormComponent,
    SpinnerComponent,
    FilterComponent,
    PaginatorComponent,
    SearchFieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forRoot({ ads: adsReducer }),
    EffectsModule.forRoot([AdsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
