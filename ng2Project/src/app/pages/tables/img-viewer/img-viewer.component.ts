import 'rxjs/add/operator/toPromise';
import {Component, OnInit, ViewChild} from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.scss']
})

export class ImgViewerComponent implements OnInit {
  navLinks: object[];
  constructor(private http: Http) {
    this.navLinks = [
      {
        'url': 'imageDetail',
        'label': '影像'
      },
      {
        'url': 'imageReport',
        'label': '报告'
      },
    ]
  }
  ngOnInit(): void {
  }

}
