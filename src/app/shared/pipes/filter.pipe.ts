import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, searchCriteria: string) {
    if (!items) {
      return [];
    } else if (!searchText) {
      return items;
    } else if (typeof items[0] === 'string') {
        return items.filter(i => i.toLowerCase().includes(searchText));
    }
  }
}
