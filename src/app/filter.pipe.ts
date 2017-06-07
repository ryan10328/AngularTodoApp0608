import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], args?: string): any {
    console.log(`args: ${args}`);

    switch (args) {
      case 'all':
        return value;
      case 'active':
        return value.filter(item => !item.done);
      case 'completed':
        return value.filter(item => item.done);
      default:
        return value;

    }
  }

}
