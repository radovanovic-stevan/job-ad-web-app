import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobAdStatus } from 'src/app/interfaces/job-ad.interface';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent {

  profileForm = new FormGroup({
    title: new FormControl<string>('',[Validators.required]),
    description: new FormControl<string>('',[Validators.required]),
    skills: new FormControl<string>('',[Validators.required]),
    status: new FormControl<JobAdStatus | null>(null,[Validators.required])
  });

}
