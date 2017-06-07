import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {
  selectedImages = [{"test": "test"}];
  isReady = false;

  constructor() {}

  setSelectedImages(images) {
    this.selectedImages = images;
    this.isReady = true;
    console.log(this.selectedImages);
  }
  getSelectedImages(): Promise<any>{
    return new Promise(resolve => {
      // if (this.isReady === true) {
      //   resolve(this.selectedImages);
      // }
      setTimeout(() => {
        resolve(this.selectedImages);
      }, 500);
    });
  }
  // getData(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(this.userData);
  //     }, 500);
  //   });
  // }
}
