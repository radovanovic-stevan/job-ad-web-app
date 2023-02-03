import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap, tap } from 'rxjs';
import { JobAd, JobAdStatus } from 'src/app/interfaces/job-ad.interface';
import { createAd, updateAd } from 'src/app/state/ads.actions';
import { AdsState, selectAdById, selectAds } from 'src/app/state/ads.selectors';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobFormComponent {

  id!: number;
  profileForm = new FormGroup({
    title: new FormControl<string>('',[Validators.required]),
    description: new FormControl<string>('',[Validators.required,Validators.minLength(10)]),
    skills: new FormControl<string>('',[Validators.required]),
    status: new FormControl<JobAdStatus | null>(null,[Validators.required])
  });

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<AdsState>) {
    this.route.paramMap
    .pipe(
      tap(map => console.log(map)),
      switchMap((paramMap: ParamMap) => this.store.select(selectAdById(+(paramMap.get("id") ?? -1)))),
    )
    .subscribe((ad: JobAd | undefined) => {
      if(!ad) return;
      this.id = ad.id;
      this.profileForm.controls.title.setValue(ad.title);
      this.profileForm.controls.description.setValue(ad.description);
      this.profileForm.controls.status.setValue(ad.status);
      this.profileForm.controls.skills.setValue(ad.skills.join("|"));
    })
  }

  submitForm() {
    // TODO: ANY
    const formPayload = this.profileForm.getRawValue() as any;
    formPayload.skills = formPayload.skills!.split("|");
    
    if(this.id) {
      this.store.dispatch(updateAd({id: this.id, changed: formPayload}))
    } else {
      console.log(formPayload)
      this.store.dispatch(createAd(formPayload))
    }

  }

  isFormDisabled() {
    return this.profileForm.invalid;
  }

  navigateBack() {
    this.router.navigateByUrl('ads');
  }

}
