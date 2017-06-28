import 'rxjs/add/operator/toPromise';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import { ImageService } from '../../../report/Apply-station/img-viewer/Apply-edit.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
  host: {
  },
})
export class ImageGalleryComponent implements OnInit {
  @ViewChild('testImagePicker') imagePicker;
  imageElement: object;
  selectedImage;
  images;
  importance;
  comment;
  keywords;
  imageNameFilterWord: string;

  isSelectModeOn: boolean;
  selectorArray: number[];

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService,
  ) {
    this.isSelectModeOn = false;
  }

  ngOnInit() {
    this.keywords = '猫';
    this.search(this.keywords);
    // this.images = [
    //   {
    //     "url":"http://placekitten.com/220/200",
    //     "isSelected": false,
    //     "comment": "comment1",
    //     "importance": "normal"
    //   },
    //   {
    //     "url":"http://placekitten.com/180/200",
    //     "isSelected": false,
    //     "comment": "comment2",
    //     "importance": "normal"
    //   },
    //   {
    //     "url":"http://placekitten.com/130/200",
    //     "isSelected": false,
    //     "comment": "comment3",
    //     "importance": "normal"
    //   }
    // ]
    // this.imageElement = this.imagePicker.nativeElement;
    // this.imageElement.imagepicker();
  }

  setSelectedImage(image) {
    // console.log("selected image");
    // image.isSelected = !image.isSelected;
    this.selectedImage = image;
  }

  search(keywords: string) {
    const url = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=' + keywords +'&mkt=zh-cn';
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Ocp-Apim-Subscription-Key','d9eab74291d5456ab73c95fc5498a3fc');
    // let option = new RequestOptions({headers: headers});
    this.http.get(url, {headers: headers}).toPromise().then(res => {
      const data = res.json();
      const images = [];
      data.value.forEach((n, i) => {
        const image = {
          url: n.contentUrl,
          thumbnailWidth: n.thumbnail.width,
          thumbnailHeight: n.thumbnail.height,
          name: n.name,
          isDeleted: false,
          isChecked: false
        };
        images.push(image);
        console.log(i, n);
      });
      this.images = images;
      console.log(data);
    });
  }

  deleteImage(image) {
    image.isDeleted = true;
  }

  highlightImage(image) {
    // image.isHighlighted = image.isHighlighted || true;
    image.isHighlighted = !image.isHighlighted;
  }

  setComment(image) {
    image.isSettingComment = !image.isSettingComment;
  }

  setImageImportance(str) {
    this.selectedImage.importance = str;
  }

  go2ImageAndReport(item) {
    console.log(item);
    const selectedImages = this.images.filter(n => n.isChecked === true);
    console.log(selectedImages);
    this.imageService.setSelectedImages(selectedImages);
    this.router.navigate(['/pages/tables/imgViewer/imageDetail']);
  }

  filterNameChanged(word) {
    // let test = _.filter(this.images, row => row.name.indexOf(word) > -1);
    this.images = this.images.filter(n => n.name.indexOf(word) > -1);
    console.log('filterNameChanged');
  }

  filterNameInput(word) {
    // let test = _.filter(this.images, row => row.name.indexOf(word) > -1);
    this.images = this.images.filter(n => n.name.indexOf(word) > -1);
    console.log('filterNameInput');
  }

  checked(index: number) {
    console.log(this);
    if (this.isSelectModeOn === true) {
      this.selectorArray.push(index);
      if (this.selectorArray.length > 1) {
        let max = -1, min = this.selectorArray[0];
        this.selectorArray.forEach( n => {
          console.log(n);
          max = n > max ? n : max;
          min = n < min ? n : min;
        });
        for (let i = min;i <= max; i++) {
          this.images[i].isChecked = true;
        }
      }
    }
  }

  detectKeydown($event) {
    if ($event.keyCode === 16 && $event.type === "keydown") {
      this.isSelectModeOn = true;
      this.selectorArray = [];
      console.log($event);
    }
  }

  detectKeyup($event) {
    if ($event.keyCode === 16 && $event.type === "keyup") {
      this.isSelectModeOn = false;
      console.log($event);
      console.log(this.selectorArray);
    }
  }
}
