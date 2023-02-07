import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FakeBackEnd } from 'db/fake-be';
import { delay, filter, Observable } from 'rxjs';
import { JobAd } from '../interfaces/job-ad.interface';
import { FetchAdsProps } from '../state/ads.actions';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  sendRealRequests = true;

  constructor(private httpClient: HttpClient) {}

  getAllAds({pageNumber, pageSize, searchTerm, filters}: FetchAdsProps): Observable<{jobs: JobAd[], length: number}> {

    const params = new HttpParams({
      fromObject: {
        pageNumber,
        pageSize,
        ...(searchTerm && {searchTerm}),
        ...(!!filters && filters.length > 0 && {filters: filters.join(',')})
      }
    });

    return this.sendRealRequests ?
    this.httpClient.get<{jobs: JobAd[], length: number}>('job-ad', {params}) :
    FakeBackEnd.returnJobAds(pageNumber, pageSize, searchTerm, filters);
    
  }

  updateAd(id: number, changed: Partial<JobAd>): Observable<string> {

    return this.sendRealRequests ?
    this.httpClient.patch<string>(`job-ad/${id}`,changed) :
    FakeBackEnd.editJobAd(id,changed);

  }

  addNewAd(ad: Omit<JobAd,"id">): Observable<{id: number}> {

    return this.sendRealRequests ?
    this.httpClient.post<{id: number}>('job-ad', ad) :
    FakeBackEnd.addNewJobAd(ad);

  }


}


