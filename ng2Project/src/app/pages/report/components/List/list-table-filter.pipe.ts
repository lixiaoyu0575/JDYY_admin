import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'idFilter',
})
export class IdFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return _.filter(array, row => row._id.indexOf(query) > -1);
        }
        return array;
    }
}

@Pipe({
  name: 'nameFilter',
})
export class NameFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      console.log(query);
      return _.filter(array, row => row.name.indexOf(query) > -1);
    }
    return array;
  }
}

@Pipe({
  name: 'ageFilter',
})
export class AgeFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => row.age === query);
    }
    return array;
  }
}

@Pipe({
  name: 'scantypeFilter',
})
export class ScanTypeFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => row.scan.indexOf(query) > -1);
    }
    return array;
  }
}
@Pipe({
  name: 'timeFilter',
})
export class TimeFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => row.time.indexOf(query) > -1);
    }
    return array;
  }
}

@Pipe({
  name: 'statusFilter',
})
export class StatusFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => row.status.indexOf(query) > -1);
    }
    return array;
  }
}
