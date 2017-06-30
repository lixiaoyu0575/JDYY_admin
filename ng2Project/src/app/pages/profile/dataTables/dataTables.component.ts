import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../report/components/List/hero.service';

@Component({
  selector: 'data-tables',
  templateUrl: './dataTables.html',
  styleUrls: ['./dataTables.scss']
})
export class DataTables {

    data;
  idFilterQuery = "";
  nameFilterQuery = "";
  ageFilterQuery = "";
  examContentFilterQuery = "";
  timeFilterQuery = "";
  statusFilterQuery = "";
    rowsOnPage = 10;
    sortBy = "email";
    sortOrder = "asc";
  startdate: string;
  enddate: string;

    constructor(
      // private service: DataTablesService,
                private service: HeroService,
    ) {
      this.service.getAllItems().then((data) => {
        this.data = data;
        console.log(this.data);
      });
  }

    toInt(num: string) {
        return +num;
    }

  filterTime(): void {
    this.service.getItemsByTime({
      'startdate' : this.startdate,
      'enddate' : this.enddate,
    }).then((data) => {
      this.data = data;
    });
  }

    sortByWordLength = (a: any) => {
        return a.city.length;
    }

}
