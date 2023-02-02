import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { jobAds } from 'temp/datasource';
import { JobAd } from '../interfaces/job-ad.interface';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor() {}

  getAllAds(): Observable<JobAd[]> {
    return of(JSON.parse(JSON.stringify(jobAds))).pipe(delay(2000));
  }

  updateAd(id: number, changed: Partial<JobAd>): Observable<void> {
    const adIndex = jobAds.findIndex(elem => elem.id === id);
    if(adIndex === -1) return throwError(() => new Error('Ad does not exist')).pipe(delay(2000));
    jobAds[adIndex] = {...jobAds[adIndex], ...changed};
    return of().pipe(delay(2000));
  }

  addNewAd(ad: Omit<JobAd,"id">): Observable<number> {
    const id = this.getNewId();
    jobAds.push({...ad, id});
    return of(id).pipe(delay(2000));
  }

  private getNewId(): number {
    let startingPoint = jobAds.length;
    while(true) {
      if(jobAds.every(elem => elem.id !== startingPoint)) return startingPoint;
      startingPoint++;
    }
  }
}
