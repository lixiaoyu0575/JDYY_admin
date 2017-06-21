import {Directive, ElementRef, Input} from '@angular/core';
import { Http } from '@angular/http';

@Directive({
  selector: '[myCornerstoneElement]',
})
export class CornerstoneElementDirective {
  @Input('myCornerstoneElement') imageId: string;
  urls: [
    "http://59.110.52.133:8081/data/imginfos/XNAT_E00229/101?format=json",
    "http://59.110.52.133:8081/data/imginfos/XNAT_E00229/103?format=json",
    "http://59.110.52.133:8081/data/imginfos/XNAT_E00229/301?format=json",
    "http://59.110.52.133:8081/data/imginfos/XNAT_E00229/302?format=json"
    ];
  constructor(
    private elementRef: ElementRef,
    private http: Http
  ) {
    this.elementRef = elementRef;
  }
  ngOnInit(el: ElementRef) {
    // If no imageId is given, do nothing
    if (!this.imageId) {
      return;
    }
    let url = 'http://59.110.52.133:8081/data/images?format=json';
    // Retrieve the DOM element itself
    var element = this.elementRef.nativeElement;

    // Enable the element with Cornerstone
    cornerstone.enable(element);

    if (!cornerstoneWADOImageLoader.webWorkerManager.isInitialized) {
      const config = {
        webWorkerPath : '/cornerstoneWADOImageLoaderWebWorker.js',
        taskConfiguration: {
          'decodeTask' : {
            codecsPath: '/cornerstoneWADOImageLoaderCodecs.js'
          }
        }
      };
      cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
      cornerstoneWADOImageLoader.webWorkerManager.isInitialized = true;
    }

    // Load the image and enable tools
    cornerstone.loadImage(this.imageId).then(function(image) {
      cornerstone.displayImage(element, image);
      cornerstoneTools.mouseInput.enable(element);
      cornerstoneTools.mouseWheelInput.enable(element);

      // Enable all tools we want to use with this element
      cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
      cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
      cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
      cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
    });
  }
}
