import { Injectable } from '@angular/core';
import { filter, debounceTime, map } from 'rxjs/operators';
import { Actions, Effect } from '@ngrx/effects';
import { Http } from '@angular/http';
import { AssetsSelectorService } from './assets.selector';

@Injectable()
export class AssetsEffect {
  isSavingInProgress = false;

  constructor(
    private http: Http,
    private actions$: Actions,
    assetsSelector: AssetsSelectorService,
  ) {
    assetsSelector.collectionAutoSave$
      .pipe(
        debounceTime(500),
        filter(data => data.length > 0),
      )
      .subscribe(data => {
        this.isSavingInProgress = true;
        // send data to API
      });
  }
}
