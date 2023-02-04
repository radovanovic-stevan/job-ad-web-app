import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
    changes = new Subject<void>();

    firstPageLabel = `No more pages this way 🤷`;
    itemsPerPageLabel = `Per page:`;
    lastPageLabel = `No more pages this way 🤷`;
    nextPageLabel = 'Next page';
    previousPageLabel = 'Previous page';
  
    getRangeLabel(page: number, pageSize: number, length: number): string {
      if (length === 0) {
        return `1 of 1`;
      }
      const amountPages = Math.ceil(length / pageSize);
      return `${page + 1} of ${amountPages}`;
    }
}