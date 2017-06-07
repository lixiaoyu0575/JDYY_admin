/**
 * Created by xiaoyu on 17-6-4.
 */
import * as _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'imageNameFilter'
})
export class ImageNamePipe implements PipeTransform {
  transform(array: any[], query: string): any {
    if (query) {
      return _.filter(array, row => row.name.indexOf(query) > -1);
    }
    return array;
  }
}
