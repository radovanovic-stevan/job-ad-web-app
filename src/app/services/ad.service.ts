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

    const obs$ = this.sendRealRequests ?
    this.httpClient.get<{jobs: JobAd[], length: number}>('http://localhost:3000/job-ad', {params}) :
    FakeBackEnd.returnJobAds(pageNumber, pageSize, searchTerm, filters);
    
    return obs$.pipe(delay(700));
  }

  updateAd(id: number, changed: Partial<JobAd>): Observable<string> {

    const obs$ = this.sendRealRequests ?
    this.httpClient.patch<string>(`http://localhost:3000/job-ad/${id}`,changed) :
    FakeBackEnd.editJobAd(id,changed);

    return obs$.pipe(delay(700));
  }

  addNewAd(ad: Omit<JobAd,"id">): Observable<{id: number}> {

    const obs$ = this.sendRealRequests ?
    this.httpClient.post<{id: number}>('http://localhost:3000/job-ad', ad) :
    FakeBackEnd.addNewJobAd(ad);

    return obs$.pipe(delay(700));
  }


}


