import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { JobAd, JobAdStatus } from 'src/app/interfaces/job-ad.interface';
import { createAd, updateAd } from 'src/app/state/ads.actions';
import { AdsState, selectAdById } from 'src/app/state/ads.selectors';

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
      switchMap((paramMap: ParamMap) => this.store.select(selectAdById(+(paramMap.get("id") ?? -1)))),
    )
    .subscribe((ad: JobAd | undefined) => {
      if(!ad) {
        if(this.route.snapshot.paramMap.get('id')) this.router.navigateByUrl('ads');
        return;
      }
      this.id = ad.id;
      if(ad.status === 'archived') this.profileForm.controls.status.disable();
      this.profileForm.controls.title.setValue(ad.title);
      this.profileForm.controls.description.setValue(ad.description);
      this.profileForm.controls.status.setValue(ad.status);
      this.profileForm.controls.skills.setValue(ad.skills.join("|"));
    })
  }

  submitForm() {
    const formPayload = this.profileForm.getRawValue();
    const changed: Omit<JobAd,'id'> = {
      skills: formPayload.skills!.trim().split("|"),
      status: formPayload.status!,
      title: formPayload.title!.trim(),
      description: formPayload.description!.trim()
    }

    if(this.id) {
      this.store.dispatch(updateAd({id: this.id, changed}))
    } else {
      this.store.dispatch(createAd({ad: changed}))
    }

  }

  isFormDisabled() {
    return this.profileForm.invalid;
  }

  navigateBack() {
    this.router.navigate(['ads'], {replaceUrl: true});
  }

}
