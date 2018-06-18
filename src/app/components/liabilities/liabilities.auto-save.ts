import { Injectable } from '@angular/core';
import { filter, debounceTime, map } from 'rxjs/operators';
import { LiabilitiesSelectorService } from '../../components/liabilities/liabilities.selectors';

@Injectable()
export class LiabilitiesAutoSaveService {
  isCashFlowBeingUpdated = false;

  constructor(liabilitiesSelector: LiabilitiesSelectorService) {
    // liabilitiesSelector.collection$
    //   .pipe(
    //     map(item => {
    //       debugger;
    //       return item;
    //     }),
    //     filter(data => data.isValid),
    //     debounceTime(2000),
    //   )
    //   .subscribe(data => {
    //     if (data.isValid && this.isCashFlowBeingUpdated) {
    //       this.isCashFlowBeingUpdated = true;
    //       // fire action
    //     }
    //   });
  }
}
