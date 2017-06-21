import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-split-view',
  templateUrl: './split-view.component.html',
  styleUrls: ['./split-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SplitViewComponent implements OnInit, AfterViewInit {
  @ViewChildren('dicom') dicomDoms: QueryList<ElementRef>;
  dragItems = [
    {
      'data': 'dragData1'
    },
    {
      'data': 'dragData2'
    },
    {
      'data': 'dragData3'
    },
    {
      'data': 'dragData4'
    }
  ];
  shouldShowDetail: boolean = true;
  sliderValueArray = [0, 1, 1, 2];
  synchronizer = new cornerstoneTools.Synchronizer("CornerstoneNewImage", cornerstoneTools.updateImageSynchronizer);

  constructor() { }

  ngOnInit() {
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
  }

  ngAfterViewInit() {
    console.log(this.dicomDoms);
    const elements = this.dicomDoms;
    elements.forEach(q => console.log(q));
    let imageIds = [
      [
        'example://1',
        'example://2',
        'example://3'
      ],
      [
        'example://1',
        'example://2',
        'example://3'
      ],
      [
        'example://1',
        'example://2',
        'example://3'
      ],
      [
        'example://1',
        'example://2',
        'example://3'
      ]
    ];

    let stacks = imageIds.map((n, i) => {
      return {
          currentImageIdIndex: this.sliderValueArray[i],
          imageIds: n
      };
    });
    console.log(stacks);
    this.dicomDoms.forEach((ele, i) => {
      let element = ele.nativeElement;
      cornerstone.loadImage(imageIds[i][this.sliderValueArray[i]]).then(image => {
        // Display the image
        cornerstone.displayImage(element, image);

        // Set the stack as tool state
        cornerstoneTools.addStackStateManager(element, ['stack', 'referenceLines']);
        cornerstoneTools.addToolState(element, 'stack', stacks[i]);

        // Add the enabled elements to the synchronization context
        this.synchronizer.add(element);

        // enable reference Lines tool
        cornerstoneTools.referenceLines.tool.enable(element, this.synchronizer);
      })
    });
  }

  sliderChanged(event) {
    console.log(this.sliderValueArray);
    console.log(event);
    let targetElement = this.dicomDoms.first.nativeElement;

    // Get the range input value
    let newImageIdIndex = event.value;

    // Get the stack data
    let stackToolDataSource = cornerstoneTools.getToolState(targetElement, 'stack');
    if (stackToolDataSource === undefined) {
      return;
    }
    let stackData = stackToolDataSource.data[0];

    // Switch images, if necessary
    if(newImageIdIndex !== stackData.currentImageIdIndex && stackData.imageIds[newImageIdIndex] !== undefined) {
      cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]).then(function(image) {
        let viewport = cornerstone.getViewport(targetElement);
        stackData.currentImageIdIndex = newImageIdIndex;
        cornerstone.displayImage(targetElement, image, viewport);
      });
    }
  }

  activatePan() {
    this.disableAllTools();
    this.dicomDoms.forEach(ele => cornerstoneTools.pan.activate(ele.nativeElement, 1));
  }

  activateZoom() {
    this.disableAllTools();
    this.dicomDoms.forEach(ele => cornerstoneTools.zoom.activate(ele.nativeElement, 1));
  }

  activateMagnification() {
    this.disableAllTools();
    this.dicomDoms.forEach(ele => cornerstoneTools.magnify.activate(ele.nativeElement, 1));
  }

  activateSimpleAngle() {
    this.disableAllTools();
    this.dicomDoms.forEach(ele => cornerstoneTools.simpleAngle.activate(ele.nativeElement, 1));
  }

  activateLength() {
    this.disableAllTools();
    this.dicomDoms.forEach(ele => cornerstoneTools.length.activate(ele.nativeElement, 1));
  }

  activateWWWC() {
    this.disableAllTools();
    this.dicomDoms.forEach(ele => cornerstoneTools.wwwc.activate(ele.nativeElement, 1));
  }

  activateAnnotation() {
    this.disableAllTools();
    this.dicomDoms.forEach(ele => cornerstoneTools.arrowAnnotate.activate(ele.nativeElement, 1));
  }

  clear() {
    this.dicomDoms.forEach(ele => {
      let toolStateManager = cornerstoneTools.getElementToolStateManager(ele.nativeElement);
      toolStateManager.clear(ele.nativeElement);
      cornerstone.updateImage(ele.nativeElement);
    });
  }

  disableAllTools() {
    const elements = this.dicomDoms;
    elements.forEach(ele => {
      let element = ele.nativeElement;
      cornerstoneTools.wwwc.disable(element);
      cornerstoneTools.pan.deactivate(element, 1); // 2 is middle mouse button
      cornerstoneTools.zoom.deactivate(element, 1); // 4 is right mouse button
      cornerstoneTools.probe.deactivate(element, 1);
      cornerstoneTools.length.deactivate(element, 1);
      cornerstoneTools.ellipticalRoi.deactivate(element, 1);
      cornerstoneTools.rectangleRoi.deactivate(element, 1);
      cornerstoneTools.angle.deactivate(element, 1);
      cornerstoneTools.highlight.deactivate(element, 1);
      cornerstoneTools.freehand.deactivate(element, 1);
      cornerstoneTools.magnify.deactivate(element, 1);
      cornerstoneTools.simpleAngle.deactivate(element, 1);
      cornerstoneTools.wwwc.deactivate(element, 1);
      cornerstoneTools.arrowAnnotate.deactivate(element, 1);
    });
  }

  onItemDrop(e) {
    console.log(e.dragData);
  }

}
