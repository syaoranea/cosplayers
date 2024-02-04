import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {
  private pageSize: number = 40;

  pagesizeObserver: BehaviorSubject<number>;

  constructor() {
    this.pagesizeObserver = new BehaviorSubject<number>(this.pageSize);
   }

  getPageSize(): number {
    return this.pageSize;
  }

  setPageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.pagesizeObserver.next(pageSize);
  }

  getPageSizeObserver(): Observable<number> {
    return this.pagesizeObserver.asObservable();
  }

}
