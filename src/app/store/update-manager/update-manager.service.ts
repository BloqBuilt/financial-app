// import { Injectable } from "@angular/core";
// import { CashFlowSelectorService } from "../selectors/cash-flow.selector";
// import { filter, debounce, time } from "rxjs/operators";

// @Injectable()
// export class UpdateManagerService {
//   isCashFlowBeingUpdated: boolean = false;

//   constructor(private cashFlowSelectorService: CashFlowSelectorService){
//     cashFlowSelectorService.cashFlowCollection$.pipe(
//       filter(data => data.isValid),
//       debounce(() => time(2000)),
//     ).subscribe(data => {
//       if(data.isValid && this.isCashFlowBeingUpdated){
//         this.isCashFlowBeingUpdated = true;
//         // fire action
//       }
//     });
//   }
// }
