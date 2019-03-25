import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekChunker',
})
export class WeekChunkerPipe implements PipeTransform {
  transform(collection: any[]): any {
    const chunk = 7;
    let weeks = [];
    for (let i = 0; collection.length > i; i += chunk) {
      weeks.push(collection.slice(i, i + chunk));
    }
    return weeks;
  }
}
