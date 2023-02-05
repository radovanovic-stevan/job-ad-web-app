import { Injectable } from '@angular/core';
import { delay, EMPTY, filter, Observable, of, throwError } from 'rxjs';
import { JobAd } from '../interfaces/job-ad.interface';
import { FetchAdsProps } from '../state/ads.actions';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor() {}

  getAllAds({pageNumber, pageSize, searchTerm, filters}: FetchAdsProps): Observable<{jobs: JobAd[], length: number}> {
    let jobsToSend: JobAd[] = JSON.parse(JSON.stringify(jobAds));
    if(searchTerm) jobsToSend = jobsToSend.filter(elem => elem.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
    //TODO: 2 of 1 bug
    if(filters && filters.length !== 0) jobsToSend = jobsToSend.filter(elem => filters.includes(elem.status));
    const length = jobsToSend.length;
    jobsToSend = jobsToSend.slice((pageNumber-1)*pageSize,((pageNumber-1)*pageSize)+pageSize);
    return of({jobs: jobsToSend, length}).pipe(delay(1200));
  }

  updateAd(id: number, changed: Partial<JobAd>): Observable<string> {
    const adIndex = jobAds.findIndex(elem => elem.id === id);
    if(adIndex === -1) return throwError(() => new Error('Ad does not exist')).pipe(delay(700));
    if(changed.title && jobAds.find(elem => elem.title === changed.title && elem.id !== id)) {
      return throwError(() => new Error('Ad with that title already exists')).pipe(delay(700));
    }
    jobAds[adIndex] = {...jobAds[adIndex], ...changed};
    return of("Creation success").pipe(delay(700));
  }

  addNewAd(ad: Omit<JobAd,"id">): Observable<number> {
    console.log(ad);
    if(jobAds.some(elem => elem.title === ad.title)) return throwError(() => new Error('Ad with that title already exists')).pipe(delay(700));
    const id = this.getNewId();
    jobAds.unshift({...ad, id});
    return of(id).pipe(delay(700));
  }

  private getNewId(): number {
    let startingPoint = jobAds.length;
    while(true) {
      if(jobAds.every(elem => elem.id !== startingPoint)) return startingPoint;
      startingPoint++;
    }
  }
}

const jobAds: JobAd[] = [
    {
        id: 1,
        title: "Software Developer @ TX Services",
        description: "Lorem ipsubore et on ullamodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        skills: ["Angular","TypeScript"],
        status: 'draft'
    },
    {
        id: 2,
        title: "Software Developer @ FIS",
        description: "Lorem ipsubore et on ullamodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        skills: ["Angular","TypeScript"],
        status: 'published'
    },
    {
        id: 3,
        title: "Software Developer @ Blinking",
        description: "Lorem ipsubore et on ullamodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        skills: ["Angular","TypeScript"],
        status: 'archived'
    },
    {
        id: 4,
        title: "Software Developer @ Grover",
        description: "Lorem ipsubore et on ullamodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        skills: ["Angular","TypeScript"],
        status: 'published'
    },
    {
        id: 5,
        title: "Software Developer @ ProudSource IT",
        description: "Lorem ipsubore et on ullamodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        skills: ["Angular","TypeScript"],
        status: 'draft'
    },
    {
      id: 6,
      title: "Software Developer @ ProudSource IT2",
      description: "Lorem ipsubore et on ullamodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      skills: ["Angular","TypeScript"],
      status: 'draft'
    },
    {
      id: 7,
      title: "Software Developer @ ProudSource IT3",
      description: "Lorem ipsubore et on ullamodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      skills: ["Angular","TypeScript"],
      status: 'draft'
    },
    {
      id: 8,
      title: "Software Developer @ ProudSource IT4",
      description: "Lorem ipsubore et on ullamodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      skills: ["Angular","TypeScript"],
      status: 'draft'
    },
    {
      id: 9,
      title: "Software Developer @ ProudSource IT5",
      description: "Lorem ipsubore et on ullamodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      skills: ["Angular","TypeScript"],
      status: 'draft'
    }
]
