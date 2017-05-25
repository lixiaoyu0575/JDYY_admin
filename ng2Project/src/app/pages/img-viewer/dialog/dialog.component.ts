/**
 * Created by xiaoyu on 17-5-24.
 */
import {Component} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';


@Component({
  selector: 'dialog-result-example',
  template: `
    <button md-button (click)="openDialog()">Launch dialog</button>
    You chose: {{selectedOption}}
  `,
})
export class DialogResultExample {
  selectedOption: string;

  constructor(public dialog: MdDialog) {}

  openDialog() {
    let dialogRef = this.dialog.open(DialogResultExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }
}


@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './dialog-result-example-dialog.html',
})
export class DialogResultExampleDialog {
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
}
