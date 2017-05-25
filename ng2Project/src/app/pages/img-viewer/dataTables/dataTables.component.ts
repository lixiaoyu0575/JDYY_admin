import { Component, OnInit } from '@angular/core';
import { DataTablesService } from './dataTables.service';
import { MdDialog, MdDialogRef } from '@angular/material';

// import { ImgDetailsComponent } from '../img-details/img-details.component';

@Component({
  selector: 'data-tables',
  templateUrl: './dataTables.html',
  styleUrls: ['./dataTables.scss'],
})
export class DataTablesComponent {

    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'email';
    sortOrder = 'asc';

    constructor(
      private service: DataTablesService,
      public dialog: MdDialog,
    ) {
    this.service.getData().then((data) => {
      this.data = data;
    });
  }

    toInt(num: string) {
        return +num;
    }

    sortByWordLength = (a: any) => {
        return a.city.length;
    }

    remove(item: object, i: number) {
      console.log(i);
      console.log(item);
      console.log(this.data);
      this.data.splice(i, 1);
    }

    addFromLocal() {
      console.log('adding from local ');
    }

    toShareWith() {
      console.log('to share with ...');
    }

    openDialog() {
      let dialogRef = this.dialog.open(TestDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });
    }
}
@Component({
  selector: 'nga-test-dialog',
  templateUrl: './../img-details/img-details.html',
  styles: [],
})
export class TestDialogComponent {
  // data;
  constructor(public dialogRef: MdDialogRef<TestDialogComponent>) {
  }

}
