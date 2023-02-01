import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdEditComponent } from './components/ad-edit/ad-edit.component';
import { AdListComponent } from './components/ad-list/ad-list.component';
import { AdNewComponent } from './components/ad-new/ad-new.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'ads', component: AdListComponent },
  { path: 'new-ad', component: AdNewComponent },
  { path: 'edit/:id', component: AdEditComponent },
  { path: '',   redirectTo: '/ads', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
