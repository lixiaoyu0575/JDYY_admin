/**
 * Created by xiaoyu on 17-5-8.
 */
var element = $('#dicomImage').get(0);

// function onViewportUpdated(e, data) {
//     var viewport = data.viewport;
//     $('#mrbottomleft').text("WW/WC: " + Math.round(viewport.voi.windowWidth) + "/" + Math.round(viewport.voi.windowCenter));
//     $('#zoomText').text("Zoom: " + viewport.scale.toFixed(2));
// };
// $(element).on("CornerstoneImageRendered", onViewportUpdated);
//
// function onNewImage(e, data) {
//     var newImageIdIndex = dicomStack.currentImageIdIndex;
//
//     // Update the slider value
//     var slider = document.getElementById('slice-range');
//     slider.value = newImageIdIndex;
//
//     // Populate the current slice span
//     var currentValueSpan = document.getElementById("sliceText");
//     currentValueSpan.textContent = "Image " + (newImageIdIndex + 1) + "/" + imageIds.length;
//
//     // if we are currently playing a clip then update the FPS
//     var playClipToolData = cornerstoneTools.getToolState(element, 'playClip');
//     if (playClipToolData !== undefined && !$.isEmptyObject(playClipToolData.data)) {
//         $("#frameRate").text("FPS: " + Math.round(data.frameRate));
//     } else {
//         if ($("#frameRate").text().length > 0) {
//             $("#frameRate").text("");
//         }
//     }
// }
// $(element).on("CornerstoneNewImage", onNewImage);

// var loopCheckbox = $("#loop");
// loopCheckbox.on('change', function() {
//     var playClipToolData = cornerstoneTools.getToolState(element, 'playClip');
//     playClipToolData.data[0].loop = loopCheckbox.is(":checked");
// })
// var imageIds = [
//     'example://1',
//     'example://2',
//     'example://3'
// ];
// var config = {
//     webWorkerPath : './cornerstoneWADOImageLoaderWebWorker.js',
//     taskConfiguration: {
//         'decodeTask' : {
//             codecsPath: './cornerstoneWADOImageLoaderCodecs.js'
//         }
//     }
// };
// cornerstoneWADOImageLoader.webWorkerManager.initialize(config);
var imageId = 'example://1';
// imageId = "wadouri:https://raw.githubusercontent.com/chafey/cornerstoneWADOImageLoader/master/testImages/CT2_J2KR";
// imageId = "wadouri:http://202.117.54.87:8081/data/experiments/XNAT_E00006/scans/1/resources/6/files/9882ed052f80a2e6fec913d84f8f89f5.dcm";
cornerstoneTools.toolStyle.setToolWidth(3);
cornerstoneTools.toolColors.setToolColor("#ffcc33");
cornerstoneTools.toolColors.setActiveColor("#0099ff");
cornerstoneTools.toolColors.setFillColor("#0099ff");


var imageIds = [imageId];
var dicomStack = {
    currentImageIdIndex: 0,
    imageIds: imageIds
};

// Initialize range input
var range, max, slice, currentValueSpan;
range = document.getElementById('slice-range');

// Set minimum and maximum value
range.min = 0;
range.step = 1;
range.max = imageIds.length - 1;

// Set current value
range.value = dicomStack.currentImageIdIndex;

function selectImage(event){
    var targetElement = document.getElementById("dicomImage");

    // Get the range input value
    var newImageIdIndex = parseInt(event.currentTarget.value, 10);

    // Get the stack data
    var stackToolDataSource = cornerstoneTools.getToolState(targetElement, 'stack');
    if (stackToolDataSource === undefined) {
        return;
    }
    var stackData = stackToolDataSource.data[0];

    // Switch images, if necessary
    if(newImageIdIndex !== stackData.currentImageIdIndex && stackData.imageIds[newImageIdIndex] !== undefined) {
        cornerstone.loadAndCacheImage(stackData.imageIds[newImageIdIndex]).then(function(image) {
            var viewport = cornerstone.getViewport(targetElement);
            stackData.currentImageIdIndex = newImageIdIndex;
            cornerstone.displayImage(targetElement, image, viewport);
        });
    }
}

// Bind the range slider events
$("#slice-range").on("input", selectImage);

// image enable the dicomImage element
cornerstone.enable(element);
// cornerstone.loadImage(imageId).then(function(image) {
cornerstone.loadAndCacheImage(imageId).then(function(image) {
    console.log(image);
    cornerstone.displayImage(element, image);
    cornerstoneTools.mouseInput.enable(element);

    // Enable all tools we want to use with this element
    cornerstoneTools.freehand.activate(element, 1);

    // cornerstoneTools.stackScroll.activate(element, 1);
    // cornerstoneTools.stackScrollWheel.activate(element);

    cornerstoneTools.scrollIndicator.enable(element);
    // set the stack as tool state
    // cornerstoneTools.addStackStateManager(element, ['stack']);
    // cornerstoneTools.addToolState(element, 'stack', dicomStack);

    activate("#activate");

    function activate(id)
    {
        $('a').removeClass('active');
        $(id).addClass('active');
    }

    // Tool button event handlers that set the new active tool
    $('#disable').click(function() {
        activate("#disable");
        cornerstoneTools.freehand.disable(element);
        return false;
    });
    $('#enable').click(function() {
        activate("#enable");
        cornerstoneTools.freehand.enable(element);
        return false;
    });
    $('#activate').click(function() {
        activate("#activate");
        cornerstoneTools.freehand.activate(element, 1);
        return false;
    });
    $('#deactivate').click(function() {
        activate("#deactivate");
        cornerstoneTools.freehand.deactivate(element, 1);
        return false;
    });

    $('#clearToolData').click(function() {
        var toolStateManager = cornerstoneTools.getElementToolStateManager(element);
        // Note that this only works on ImageId-specific tool state managers (for now)
        toolStateManager.clear(element)
        cornerstone.updateImage(element);
    });

    var elements = [element],
        appState;
    $('#saveToolData').click(function() {
        appState = cornerstoneTools.appState.save(elements);
        console.log(cornerstoneTools.appState);
        console.log(appState);
        alert("saved drawing object: " + appState);
        // var serializedState = JSON.stringify(appState);
        // var toolStateManager = cornerstoneTools.getElementToolStateManager(element);
        // // Note that this only works on ImageId-specific tool state managers (for now)
        // toolStateManager.clear(element)
        // cornerstone.updateImage(element);
    });

    $('#restoreToolData').click(function() {
        cornerstoneTools.appState.restore(appState);
    });
    $('#playClip').click(function() {
        activate("#playClip");
        cornerstoneTools.playClip(element, 31);
        return false;
    });
    $('#stopClip').click(function() {
        activate("#stopClip");
        cornerstoneTools.stopClip(element);
        $("#frameRate").text("");
        return false;
    });

});
