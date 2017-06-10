import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ImageTableService } from './image-table.service';

@Component({
  selector: 'app-image-table',
  templateUrl: './image-table.component.html',
  styleUrls: ['./image-table.component.scss']
})
export class ImageTableComponent implements OnInit {

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

  private _opened: boolean = true;
  private _mode: string = 'push';
  private _position: string = 'right';
  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  constructor(
    private service: ImageTableService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.service.getData().then((data) => {
      this.data = data;
    });
  }

  ngOnInit() {
  }

  getDetails(item) {
    console.log(item);
    this.router.navigate(['/pages/tables/imgViewer/imageDetail']);
  }
  remove(item) {
    console.log(item);
  }

  toInt(num: string) {
    return +num;
  }

  sortByWordLength = (a: any) => {
    return a.city.length;
  }

}
