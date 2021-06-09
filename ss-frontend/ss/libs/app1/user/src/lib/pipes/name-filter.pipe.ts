import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../shared';

@Pipe({
  name: 'nameFilter',
})
export class NameFilterPipe implements PipeTransform {
  transform(users: User[], filter: string): unknown {
    if (!users || !filter) {
      return users;
    }

    return users.filter(
      (item) => item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    );
  }
}
