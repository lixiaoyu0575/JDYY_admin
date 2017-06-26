/**
 * Created by yqzheng on 2017/6/25.
 */
import { Component, OnInit } from '@angular/core';
import { personalInformService } from './personalInform.service';

@Component({
  selector: 'person-Inform',
  templateUrl: './personalInform.html',
  // styleUrls: ['./personalInform.scss']
})
export class personalInform {

  data;
  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "email";
  sortOrder = "asc";

  constructor(private service: personalInformService) {
    // this.service.getData().then((data) => {
    //   this.data = data;
    // });
  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }

}
