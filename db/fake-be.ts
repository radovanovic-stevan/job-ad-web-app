import { Observable, of, delay, throwError } from 'rxjs';
import { JobAd } from 'src/app/interfaces/job-ad.interface';
import { jobAds } from './fake-data';

export class FakeBackEnd {
  static returnJobAds(
    pageNumber: number,
    pageSize: number,
    searchTerm: string | undefined,
    filters: string[] | undefined
  ): Observable<{ jobs: JobAd[]; length: number }> {
    let jobsToSend: JobAd[] = JSON.parse(JSON.stringify(jobAds));
    if (searchTerm)
      jobsToSend = jobsToSend.filter((elem) =>
        elem.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
    //TODO: 2 of 1 bug
    if (filters && filters.length !== 0)
      jobsToSend = jobsToSend.filter((elem) => filters.includes(elem.status));
    const length = jobsToSend.length;
    jobsToSend = jobsToSend.slice(
      (pageNumber - 1) * pageSize,
      (pageNumber - 1) * pageSize + pageSize
    );
    return of({ jobs: jobsToSend, length }).pipe(delay(1200));
  }

  static editJobAd(id: number, changed: Partial<JobAd>) {
    const adIndex = jobAds.findIndex((elem) => elem.id === id);
    if (adIndex === -1)
      return throwError(() => new Error('Ad does not exist')).pipe(delay(700));
    if (
      changed.title &&
      jobAds.find((elem) => elem.title === changed.title && elem.id !== id)
    ) {
      return throwError(
        () => new Error('Ad with that title already exists')
      ).pipe(delay(700));
    }
    jobAds[adIndex] = { ...jobAds[adIndex], ...changed };
    return of('Creation success').pipe(delay(700));
  }

  static addNewJobAd(ad: Omit<JobAd, 'id'>) {
    if (jobAds.some((elem) => elem.title === ad.title))
      return throwError(
        () => new Error('Ad with that title already exists')
      ).pipe(delay(700));
    const id = this.getNewId();
    jobAds.unshift({ ...ad, id });
    return of(id).pipe(delay(700));
  }

  private static getNewId(): number {
    let startingPoint = jobAds.length;
    while (true) {
      if (jobAds.every((elem) => elem.id !== startingPoint))
        return startingPoint;
      startingPoint++;
    }
  }
}
