import 'rxjs/add/operator/toPromise';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  @ViewChild('testImagePicker') imagePicker;
  imageElement: object;
  selectedImage;
  images;
  importance;
  comment;
  keywords;

  constructor(
    private http: Http
  ) {
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
          thumbnailHeight: n.thumbnail.height
        };
        images.push(image);
        console.log(i, n);
      });
      this.images = images;
      console.log(data);
    });
  }

  deleteImage(index) {
    console.log(index);
    this.images.splice(index, 1);
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

}
