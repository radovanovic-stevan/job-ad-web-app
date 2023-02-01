import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdListComponent } from './components/ad-list/ad-list.component';
import { AdNewComponent } from './components/ad-new/ad-new.component';
import { AdEditComponent } from './components/ad-edit/ad-edit.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/ui/header/header.component';
import { adsReducer } from './state/ads.reducer';
import { AdCardComponent } from './components/ad-card/ad-card.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AdListComponent,
    AdNewComponent,
    AdEditComponent,
    HeaderComponent,
    AdCardComponent,
    SearchFormComponent,
    JobFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forRoot({ ads: adsReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
