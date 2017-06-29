import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeroService } from '../components/List/hero.service';

@Component({
  selector: 'apply-table',
  templateUrl: './apply-list.component.html',
  styleUrls: ['./apply-list.component.scss']
})
export class ApplyListComponent implements OnInit {

  data;
 navigateRoute: string;
  selectedItem;
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
    private service: HeroService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.service.getAllItems().then((data) => {
      this.data = data;
      console.log(this.data);
    });
  }

  ngOnInit() {
    this.enddate = this.service.getTime();
    this.startdate = this.enddate;
  }

  getDetails(item) {
    console.log(item);
    this.router.navigate(['../pages/tables/imgViewer', item.examID, 'imageDetail']);
  }
  remove(item) {
    console.log(item);
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

  onSelect(item): void {
    this.selectedItem = item;
    console.log(this.navigateRoute);
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }

}
