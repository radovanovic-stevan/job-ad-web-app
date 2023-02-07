import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdListComponent } from './components/ad-list/ad-list.component';
import { JobFormComponent } from './components/job-form/job-form.component';
import { PageNotFoundComponent } from './components/ui/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'ads', component: AdListComponent },
  { path: 'new-ad', component: JobFormComponent },
  { path: 'edit/:id', component: JobFormComponent },
  { path: '', redirectTo: '/ads', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
