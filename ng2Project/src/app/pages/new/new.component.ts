/**
 * Created by xiaoyu on 17-5-14.
 */

import { Component } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { OnInit, ViewChild } from '@angular/core';
import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import * as _ from 'lodash';
console.log(cornerstone);
console.log(cornerstoneTools);
console.log(cornerstoneWADOImageLoader);
// console.log(testDeclare);
@Component({
  selector: 'nga-new-component',
  template: `
    <strong>Test Page Content Here Test</strong>
    <form class="example-form">
      <md-input-container class="example-full-width">
        <input mdInput placeholder="Company (disabled)" disabled value="Google">
      </md-input-container>

      <table class="example-full-width" cellspacing="0"><tr>
        <td><md-input-container class="example-full-width">
          <input mdInput placeholder="First name">
        </md-input-container></td>
        <td><md-input-container class="example-full-width">
          <input mdInput placeholder="Long Last Name That Will Be Truncated">
        </md-input-container></td>
      </tr></table>

      <p>
        <md-input-container class="example-full-width">
          <textarea mdInput placeholder="Address">1600 Amphitheatre Pkwy</textarea>
        </md-input-container>
        <md-input-container class="example-full-width">
          <textarea mdInput placeholder="Address 2"></textarea>
        </md-input-container>
      </p>

      <table class="example-full-width" cellspacing="0"><tr>
        <td><md-input-container class="example-full-width">
          <input mdInput placeholder="City">
        </md-input-container></td>
        <td><md-input-container class="example-full-width">
          <input mdInput placeholder="State">
        </md-input-container></td>
        <td><md-input-container class="example-full-width">
          <input mdInput #postalCode maxlength="5" placeholder="Postal Code" value="94043">
          <md-hint align="end">{{postalCode.value.length}} / 5</md-hint>
        </md-input-container></td>
      </tr></table>
    </form>
  `,
  styles: [
    `
      .example-form {
        width: 500px;
      }

      .example-full-width {
        width: 100%;
      }
    `
  ]
})
export class NewComponent {
  constructor(){}
}


@Component({
  selector: 'app-my-dicom',
  template: `
    <ba-card>
      <div class="row">
        <div class="col-xs-3">
          <form>
            <input #filter (keyup)="filterNodes(filter.value, tree)" placeholder="过滤"/>
          </form>
          <div style="height: 400px; width: 100%">

            <tree-root
              #tree
              [nodes]="nodes"
              [options]="customTemplateStringOptions"
              [focused]="true"
              (onEvent)="onEvent($event)"
            >
              <ng-template #treeNodeTemplate let-node >
                <span title="{{node.data.subTitle}}"  [class.labelDone]="node.data.isLabelDone"
                      [class.labelNotDone]="!node.data.isLabelDone">{{ node.data.name }}</span>
                <span class="pull-right">{{ childrenCount(node) }}</span>
                <!--<button (click)="test(node)">test</button>-->

                <!--<button (click)="go($event)">Custom Action</button>-->
              </ng-template>
              <ng-template #loadingTemplate>载入中, 请稍候....</ng-template>
            </tree-root>
          </div>
        </div>
        <div class="col-xs-2">
          <ul class="list-group">
            <a id="rectangleroi1" class="list-group-item" (click)="chooseType1()">Type 1
              <svg width="10px" height="10px"><rect stroke="black" width="10px" height="10px" fill="red"></rect></svg></a>
            <a id="rectangleroi2" class="list-group-item" (click)="chooseType2()">Type 2
              <svg width="10px" height="10px"><rect stroke="black" width="10px" height="10px" fill="yellow"></rect></svg></a>
            <a id="rectangleroi3" class="list-group-item" (click)="chooseType3()">Type 3
              <svg width="10px" height="10px"><rect stroke="black" width="10px" height="10px" fill="pink"></rect></svg></a>
            <a id="rectangleroi4" class="list-group-item" (click)="chooseType4()">Type 4
              <svg width="10px" height="10px"><rect stroke="black" width="10px" height="10px" fill="greenyellow"></rect></svg></a>
            <a id="rectangleroi5" class="list-group-item" (click)="chooseType5()">Type 5
              <svg width="10px" height="10px"><rect stroke="black" width="10px" height="10px" fill="orange"></rect></svg></a>
            <!--<a id="freehand1" class="list-group-item" (click)="chooseFreehand1()">Type 1(freehand)</a>-->
            <!--<a id="freehand2" class="list-group-item" (click)="chooseFreehand2()">Type 2(freehand)</a>-->
          </ul>
          <ul class="list-group">
            <a id="submit" class="list-group-item" (click)="submit()">保存</a>
            <a id="clear" class="list-group-item" (click)="clear()">清空</a>
            <!--<a id="restore" class="list-group-item" (click)="restore()">Restore</a>-->
          </ul>
          <br>
        </div>
        <div class="col-xs-7">
          <div #dicomDom id="dicomDom"
               style="width:768px;height:768px;position:relative;display:inline-block;color:white;"
               oncontextmenu="return false"
               class='cornerstone-enabled-image'
               unselectable='on'
               onselectstart='return false;'
               onmousedown='return false;'>
            <div id="dicomImage"
                 style="width:512px;height:512px;top:0px;left:0px; position:absolute;">
            </div>
            <!--<div id="mrtopleft" style="position: absolute;top:3px; left:3px">-->
            <!--Patient Name-->
            <!--</div>-->
            <!--<div id="mrtopright" style="position: absolute;top:3px; right:3px">-->
            <!--Hospital-->
            <!--</div>-->
            <div id="mrbottomright" style="position: absolute;bottom:6px; right:3px">
              <div id="frameRate"></div>
              <div id="zoomText">Zoom: </div>
              <div id="sliceText">Image: </div>
            </div>
            <div id="mrbottomleft" style="position: absolute;bottom:3px; left:3px">
              WW/WC:
            </div>
          </div>
        </div>
      </div>
    </ba-card>
  `,

  styles: [
      `
      .tree {
        width: 100%;
      }
      .labelDone {
        background-color: greenyellow;
      }
      .labelNotDone {
        background-color: orange;
      }
      button: {
        line - height: 24px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 2px;
        background: #A3D9F5;
        cursor: pointer;
        margin: 0 3px;
      }`
  ],
  // styleUrls: [""]
})
export class DicomComponent implements OnInit {
  @ViewChild('dicomDom') dicomDom;
  nodes: any[];
  element: object;
  savedState: string;
  isLabelDone: boolean;
  currentNode: TreeNode;
  localUrlPrefix: string;
  imgUrl: string;
  imgUrlPrefix: string;
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
    this.localUrlPrefix = 'http://localhost:8081';
    this.imgUrlPrefix = 'wadouri:http://localhost:8081';
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
    const config = {
      webWorkerPath : '/scripts/lib/labelModule/libs/imgViewer/cornerstoneWADOImageLoaderWebWorker.js',
      taskConfiguration: {
        'decodeTask' : {
          codecsPath: '/scripts/lib/labelModule/libs/imgViewer/cornerstoneWADOImageLoaderCodecs.js'
        }
      }
    };
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

  loadImg() {
    const imageId = this.imgUrl;
    const element = this.element;
    // const canvas = $('canvas');
    // if (canvas) {
    //   console.log('canvas here');
    //   canvas.remove();
    // }
    // Load the image and enable tools
    cornerstone.loadImage(imageId).then((image) => {
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
    cornerstoneTools.wwwc.disable(element);
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
