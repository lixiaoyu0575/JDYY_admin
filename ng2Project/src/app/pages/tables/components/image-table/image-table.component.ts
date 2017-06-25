import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeroService } from '../../../report/components/List/hero.service';

@Component({
  selector: 'app-image-table',
  templateUrl: './image-table.component.html',
  styleUrls: ['./image-table.component.scss']
})
export class ImageTableComponent implements OnInit {

  data;
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

  constructor(
    private service: HeroService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.service.getAllItems().then((data) => {
      this.data = data;
      console.log(this.data);
    });
  }

  ngOnInit() {
  }

  getDetails(item) {
    console.log(item);
    this.router.navigate(['/pages/tables/imgViewer', this.selectedItem.ID, 'imageDetail']);
  }
  remove(item) {
    console.log(item);
  }

  toInt(num: string) {
    return +num;
  }

  onSelect(item): void {
    this.selectedItem = item;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }

}
