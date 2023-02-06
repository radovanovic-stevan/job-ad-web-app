import { Injectable } from '@angular/core';
import { FakeBackEnd } from 'db/fake-be';
import { Observable } from 'rxjs';
import { JobAd } from '../interfaces/job-ad.interface';
import { FetchAdsProps } from '../state/ads.actions';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor() {}

  getAllAds({pageNumber, pageSize, searchTerm, filters}: FetchAdsProps): Observable<{jobs: JobAd[], length: number}> {
    return FakeBackEnd.returnJobAds(pageNumber, pageSize, searchTerm, filters);
  }

  updateAd(id: number, changed: Partial<JobAd>): Observable<string> {
    return FakeBackEnd.editJobAd(id,changed);
  }

  addNewAd(ad: Omit<JobAd,"id">): Observable<number> {
    return FakeBackEnd.addNewJobAd(ad)
  }


}


