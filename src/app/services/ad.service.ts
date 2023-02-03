import { Injectable } from '@angular/core';
import { delay, EMPTY, Observable, of, throwError } from 'rxjs';
import { JobAd } from '../interfaces/job-ad.interface';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor() {}

  getAllAds(): Observable<JobAd[]> {
    return of(JSON.parse(JSON.stringify(jobAds))).pipe(delay(2000));
  }

  updateAd(id: number, changed: Partial<JobAd>): Observable<string> {
    //TODO: Check for titles when updating
    const adIndex = jobAds.findIndex(elem => elem.id === id);
    if(adIndex === -1) return throwError(() => new Error('Ad does not exist')).pipe(delay(700));
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
    }
]
