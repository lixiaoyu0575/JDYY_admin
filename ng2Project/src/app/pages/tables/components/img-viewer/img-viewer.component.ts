import 'rxjs/add/operator/toPromise';
import {Component, OnInit, ViewChild} from '@angular/core';
import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import * as _ from 'lodash'

const localIp = 'localhost';

@Component({
  selector: 'img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.scss']
})

export class ImgViewerComponent implements OnInit {
  @ViewChild('dicomDom') dicomDom;
  nodes: any[];
  element: object;
  savedState: string;
  isLabelDone: boolean;
  currentNode: TreeNode;
  localUrlPrefix: string;
  imgUrl: string;
  imgUrlPrefix: string;

  direction: string;
  isReportShow: boolean;
  isImageShow: boolean;

  actionMapping: IActionMapping = {
    mouse: {
      // contextMenu: (tree, node, $event) => {
      //   $event.preventDefault();
      //   alert(`context menu for ${node.data.name}`);
      // },
      dblClick: (tree, node, $event) => {
        if (node.hasChildren) {TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);}
      },
      click: (tree, node, $event) => {
        $event.shiftKey
          ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
          : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
        if (node.data.children && node.data.children.length === 0) {
          // console.log(node);
          // console.log(tree);
          const leafNodesUrl = this.localUrlPrefix + '/data/imginfos/' +
            node.parent.data.name + '/' + node.data.scanId;
          this.http.get(leafNodesUrl).toPromise().then(res => {
            const data = res.json();
            const imgs = data.ResultSet.content.images;
            for (let j = 0; j < imgs.length; j++) {
              const imgNode = {
                name: imgs[j].img_name,
                labelState: imgs[j].img_label,
                url: imgs[j].img_uri,
                isLabelDone: true
              }
              if (imgs[j].img_label === 0) {
                imgNode.isLabelDone = false;
              }
              node.data.children.push(imgNode);
            }
            node.treeModel.update();
          });
        }
        if (!node.data.children) {
          this.currentNode = node;
          this.imgUrl = this.imgUrlPrefix + node.data.url;
          this.loadImg();
        }
      }
    },
    keys: {
      [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
    }
  };
  customTemplateStringOptions: ITreeOptions = {
    displayField: 'subTitle',
    isExpandedField: 'expanded',
    idField: 'uuid',
    actionMapping: this.actionMapping,
    nodeHeight: 23,
    allowDrag: false,
    useVirtualScroll: true,
    // animateExpand: true,
    // animateSpeed: 30,
    // animateAcceleration: 1.2
  };
  constructor(private http: Http) {
    this.isLabelDone = true;
    this.localUrlPrefix = 'http://' + localIp + ':8081';
    this.imgUrlPrefix = 'wadouri:http://' + localIp + ':8081';
    // this.localUrlPrefix = 'http://localhost:8081';
    // this.imgUrlPrefix = 'wadouri:http://localhost:8081';


    this.direction = "row";
    this.isReportShow = true;
    this.isImageShow = true;
  }
  ngOnInit(): void {
    // Retrieve the DOM element itself
    this.element = this.dicomDom.nativeElement;
    const element = this.element;
    this.imgUrl = 'example://1';
    // this.imgUrl = 'wadouri:http://localhost:8081/data/labelinfos/XNAT_E00002/1/51d7aac4bcb27b67bddbab6f13969b61.dcm';
    // Enable the element with Cornerstone
    cornerstone.enable(element);

    // Listen for changes to the viewport so we can update the text overlays in the corner
    $('#dicomDom').on('CornerstoneImageRendered', (e) => {
      // console.log('dicomimage CornerstoneImageRendered');
      const viewport = cornerstone.getViewport(e.target);
      $('#mrbottomleft').text('WW/WC: ' + Math.round(viewport.voi.windowWidth) + '/' + Math.round(viewport.voi.windowCenter));
      $('#mrbottomright').text('Zoom: ' + viewport.scale.toFixed(2));
    });
    // const config = {
    //   webWorkerPath : './../../../../../../libs/imgViewer/cornerstoneWADOImageLoaderWebWorker.js',
    //   taskConfiguration: {
    //     'decodeTask' : {
    //       codecsPath: './../../../../../../libs/imgViewer/cornerstoneWADOImageLoaderCodecs.js'
    //     }
    //   }
    // };
    // cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
    this.loadImg();
    $('.list-group-item').removeClass('active');

    const jsonUrl = this.localUrlPrefix + `/data/images`;
    // const jsonUrl = `./../../assets/testData/testApi1.json`;
    setTimeout(() => {
      this.nodes = [];
      this.http.get(jsonUrl).toPromise().then((data) => this.nodes = getNodesFormat(data.json()));
    }, 1);
  }

  toggleReport() {
    this.isReportShow = !this.isReportShow;
  }
  toggleImage() {
    this.isImageShow = !this.isImageShow;
  }
  toggleDirection() {
  }

  loadImg() {
    const imageId = this.imgUrl;
    const element = this.element;
    // const canvas = $('canvas');
    // if (canvas) {
    //   console.log('canvas here');
    //   canvas.remove();
    // }
    // Load the image and enable tools
    cornerstone.loadImage('example://1').then((image) => {
      cornerstone.displayImage(element, image);
      cornerstoneTools.mouseInput.enable(element);
      cornerstoneTools.mouseWheelInput.enable(element);
      cornerstoneTools.pan.activate(element, 4);

      // cornerstoneTools.freehand.activate(element, 1);
      cornerstoneTools.zoomWheel.activate(element, 3); // zoom is the default tool for middle mouse wheel
      if (this.currentNode && this.localUrlPrefix) {
        this.loadLabelsState();
      }
    });
  }

  loadLabelsState() {
    const node = this.currentNode;
    const url = this.localUrlPrefix + '/data/labelinfos/' + node.parent.parent.data.name + '/' +
      node.parent.data.scanId + '/' + node.data.name;
    this.http.get(url).toPromise().then((res) => {
      const data = res.json();
      // data.then(function (d) {
      //   console.log(d);
      // })
      console.log(data);
      const savedState = data["ResultSet"]["content"]["label_info"];
      if (savedState) {
        this.disableAllTools();
        this.savedState = savedState;
        cornerstoneTools.appState.restore(JSON.parse(this.savedState));
        cornerstone.updateImage(this.element);
      }
    });
  }

  childrenCount(node: TreeNode): string {
    return node && node.children && node.children.length !== 0 ? `(${node.children.length})` : '';
  }

  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text);
  }

  onEvent(event) {
    // console.log(event);
  }

  go($event) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  activeNodes(treeModel) {
    console.log(treeModel.activeNodes);
  }

  disableAllTools() {
    const element = this.element;
    // cornerstoneTools.wwwc.disable(element);
    // cornerstoneTools.pan.activate(element, 2); // 2 is middle mouse button
    // cornerstoneTools.zoom.activate(element, 4); // 4 is right mouse button
    cornerstoneTools.probe.deactivate(element, 1);
    cornerstoneTools.length.deactivate(element, 1);
    cornerstoneTools.ellipticalRoi.deactivate(element, 1);
    cornerstoneTools.rectangleRoi.deactivate(element, 1);
    cornerstoneTools.angle.deactivate(element, 1);
    cornerstoneTools.highlight.deactivate(element, 1);
    cornerstoneTools.freehand.deactivate(element, 1);
  }

  chooseType1() {
    activate('#rectangleroi1');
    this.disableAllTools();
    cornerstoneTools.toolColors.setToolColor('red');
    cornerstoneTools.freehand.activate(this.element, 1);
    // cornerstoneTools.rectangleRoi.setLabel('type1');
  }

  chooseType2() {
    activate('#rectangleroi2');
    this.disableAllTools();
    cornerstoneTools.toolColors.setToolColor('yellow');
    cornerstoneTools.freehand.activate(this.element, 1);
    // cornerstoneTools.rectangleRoi.setLabel('type2');
  }

  chooseType3() {
    activate('#rectangleroi3');
    this.disableAllTools();
    cornerstoneTools.toolColors.setToolColor('pink');
    cornerstoneTools.freehand.activate(this.element, 1);
    // cornerstoneTools.rectangleRoi.setLabel('type3');
  }

  chooseType4() {
    activate('#rectangleroi4');
    this.disableAllTools();
    cornerstoneTools.toolColors.setToolColor('greenyellow');
    cornerstoneTools.freehand.activate(this.element, 1);
    // cornerstoneTools.rectangleRoi.setLabel('type4');
  }

  chooseType5() {
    activate('#rectangleroi5');
    this.disableAllTools();
    cornerstoneTools.toolColors.setToolColor('orange');
    cornerstoneTools.freehand.activate(this.element, 1);
    // cornerstoneTools.rectangleRoi.setLabel('type5');
  }

  activateTool(id: string) {
    const element = this.element;
    activateTool('#' + id);
    if (id === "rightDrag") {
      cornerstoneTools.wwwc.deactivate(element, 4);
      cornerstoneTools.pan.activate(element, 4);
    } else {
      cornerstoneTools.pan.deactivate(element, 4);
      cornerstoneTools.wwwc.activate(element, 4);
    }
    // cornerstoneTools.freehand.activate(this.element, 1);
    // cornerstoneTools.rectangleRoi.setLabel('type5');
  }

  // chooseFreehand1() {
  //   activate('#freehand1');
  //   this.disableAllTools();
  //   cornerstoneTools.toolColors.setToolColor('red');
  //   cornerstoneTools.freehand.activate(this.element, 1);
  //   // cornerstoneTools.rectangleRoi.setLabel('type1');
  // }
  //
  // chooseFreehand2() {
  //   activate('#freehand2');
  //   this.disableAllTools();
  //   cornerstoneTools.toolColors.setToolColor('yellow');
  //   cornerstoneTools.freehand.activate(this.element, 1);
  //   // cornerstoneTools.rectangleRoi.setLabel('type1');
  // }

  submit() {
    const labelsState = cornerstoneTools.appState.save([this.element]);
    const savedState = JSON.stringify(labelsState);

    console.log(this.currentNode);
    this.currentNode.data.isLabelDone = true;
    updateNodeState(this.currentNode.parent);
    updateNodeState(this.currentNode.parent.parent);
    updateNodeState(this.currentNode.parent.parent.parent);
    const node = this.currentNode;
    const labeledData = {
      exp_id: node.parent.parent.data.name,
      scan_id: node.parent.data.scanId,
      img_name: node.data.name,
      label_info: savedState,
      label_type: 'test_label_type'
    };

    const url = this.localUrlPrefix + '/data/labelinsert';

    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers});

    this.http.post(url, labeledData, options).toPromise().then(() => console.log('sended labelData'));
  }

  clear() {
    const element = this.element;
    const toolStateManager = cornerstoneTools.getElementToolStateManager(element);
    toolStateManager.clear(element);
    cornerstone.updateImage(element);
  }

  // restore() {
  //   const appState = JSON.parse(this.savedState);
  //   cornerstoneTools.appState.restore(appState);
  //   cornerstone.updateImage(this.element);
  // }

  // dicomClicked(node: TreeNode) {
  //   this.currentNode = node;
  //   console.log(node);
  //   console.log(node.parent.children);
  // }

}

function getNodesFormat(data: any): any {
  const allData = data.ResultSet.content;
  const newNodes = [];
  for (const k2 in allData) {
    if (allData.hasOwnProperty(k2)) {
      const fNode = {
        name: k2,
        children: [],
        isLabelDone: false
      }
      data = allData[k2];
      for (const k in data) {
        if (data.hasOwnProperty(k)) {
          const expNode = {
            name: k,
            subTitle: 'test',
            children: []
          };
          for (let i = 0; i < data[k].length; i++) {
            const scanNode = {
              name: 'ScanID-' + data[k][i].scan_id,
              children: [],
              isLabelDone: true,
              scanId: data[k][i].scan_id.toString(),
              hasChildren: true,
            };
            if (data[k][i].label_info === 'unlabel' || data[k][i].label_info === 'labeling') {
              scanNode.isLabelDone = false;
              fNode.isLabelDone = false;
            }
            // const imgs = data[k][i].images;
            // for (let j = 0; j < imgs.length; j++) {
            //     const imgNode = {
            //         name: imgs[j].img_name,
            //         labelState: imgs[j].img_label,
            //         url: imgs[j].img_uri,
            //         isLabelDone: true
            //     }
            //     console.log(imgs[i].img_label);
            //     if (imgs[j].img_label === 0) {
            //         imgNode.isLabelDone = false;
            //         scanNode.isLabelDone = false;
            //         fNode.isLabelDone = false;
            //     }
            //     scanNode.children.push(imgNode);
            // }
            expNode.children.push(scanNode);
          }
          fNode.children.push(expNode);
        }
      }
      newNodes.push(fNode);
    }
  }
  console.log(newNodes);
  return newNodes;
}

function activate(id: string): void {
  $('.list-group-item').removeClass('active');
  $(id).addClass('active');
}
function activateTool(id: string): void {
  $('.active-tool').removeClass('active');
  $(id).addClass('active');
}
function updateNodeState(node: TreeNode): void {
  if (!node.data.children) {
    return;
  }
  const nodeChildren = node.data.children;
  let isLabelDone = true;
  for (let i = 0; i < nodeChildren.length; i++) {
    if (nodeChildren[i].isLabelDone === false) {
      isLabelDone = false;
    }
  }
  node.data.isLabelDone = isLabelDone;
}
