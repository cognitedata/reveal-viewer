# Cognite REVEAL 3D Web Viewer

Visualize Cognite's 3D models in a web browser with [WebGL](https://en.wikipedia.org/wiki/WebGL).

## Data collection ##

_Note_: The component will by default send anonymous usage statistics.
This is used to improve the 3D viewer.
You can opt out from this in the [[Cognite3DViewer]] constructor.

## Cognite Data Fusion prerequisites

To be able to use this 3D viewer you need to have access to Cognite Data Fusion. You can upload 3D models using [Cognite 3D ingestor](http://3d-ingestor.cogniteapp.com), or by looking at [Cognite's API documentation](https://doc.cognitedata.com/api/0.6/#tag/3D). You can then use this viewer to visualize the 3D model in any web-based application on desktop or mobile devices.

You need to install the [Cognite SDK](https://www.npmjs.com/package/@cognite/sdk) which needs to be authenticated before loading the 3D viewer.

## Installation

Install the package with yarn:

    yarn add @cognite/3d-viewer

or npm:

    npm install @cognite/3d-viewer

## Documentation

Visit [npmjs.com/package/@cognite/3d-viewer](https://www.npmjs.com/package/@cognite/3d-viewer) to see the most up-to-date documentation.

## Usage

```js
import { Cognite3DViewer, THREE, TWEEN } from '@cognite/3d-viewer';
// Remember to authenticate with the Cognite SDK.
const viewer = new Cognite3DViewer();
// Create three.js objects
const vector = new THREE.Vector3();
// Use TWEEN to animate e.g. the camera, see npmjs.com/package/@tweenjs/tween.js
```

### Requirements

To be able to use this package you need the following polyfills:

-   [babel-polyfill](https://babeljs.io/docs/en/babel-polyfill)

### Sample code

```js
// Remember to authenticate with the Cognite SDK.

// The viewer will render to a canvas inside a wrapper container.
// You can specify the wrapper by setting options.domElement and passing the options argument 
// to the Cognite3DViewer constructor. If not set, it will create a div element for you.
const viewer = new Cognite3DViewer();

// You can then add the div to your existing DOM:
document.body.appendChild(viewer.domElement);

// At this point you will only see a black canvas.

// So let's add a 3D model:
const options = {
  modelId,     // 3D model id
  revisionId,  // The model's revision id
};
viewer.addModel(options).then(function(model) {
  // Move camera to look at the model
  viewer.fitCameraToModel(model, 0);
});
```

> Note: You may need additional styling to the wrapper div container to make it fit your use-case.
> By default, the wrapper will have this style:
>
> ```css
> {
>   width: 100vw;
>   height: 100vh;
> }
> ```
>
> The internal canvas will be styled to fill this wrapper.

#### Add progress listeners

```js
function onProgress(progress) {
  console.log(progress);
}

function onComplete() {
  console.log('Model loaded');
}

const options = {
  modelId,
  revisionId,
  onProgress, // optional
  onComplete, // optional
};
viewer.addModel(options)...
```

#### Make the viewer clickable

-   **See: [[Cognite3DModel.getBoundingBox]]**
-   **See: [[Cognite3DViewer.getIntersectionFromPixel]]**
-   **See: [[Cognite3DViewer.fitCameraToBoundingBox]]**
-   **See: [[Cognite3DModel.deselectAllNodes]]**

```js
viewer.on('click', function(event) {
  const { offsetX, offsetY } = event;
  const intersection = viewer.getIntersectionFromPixel(offsetX, offsetY);
  if (intersection !== null) {
    const { nodeId, point, model } = intersection;
    console.log('User clicked at world coordinate', point);
    // highlight the object
    model.selectNode(nodeId);
    // make the camera zoom to the object
    const boundingBox = model.getBoundingBox(nodeId);
    viewer.fitCameraToBoundingBox(boundingBox, 2000); // 2 sec
  } else {
    // Clicked outside the 3D model
    model.deselectAllNodes();
  }
});
```

#### Load saved camera position from the API

Assume you have the revision object from Cognite Data Fusion which you can get from this [endpoint](https://doc.cognitedata.com/api/0.6/#operation/getRevision).

Here is a code snippet to use the saved camera position:

```js
  const { target, position } = revision.camera;
  if (Array.isArray(target) && Array.isArray(position)) {
    // Create three.js objects
    const positionVector = new THREE.Vector3(...position);
    const targetVector = new THREE.Vector3(...target);
    // Apply transformation matrix
    positionVector.applyMatrix4(model.matrix);
    targetVector.applyMatrix4(model.matrix);
    // Set on viewer
    viewer.setCameraPosition(positionVector);
    viewer.setCameraTarget(targetVector);
  } else {
    viewer.fitCameraToModel(model, 0);
  }
```

## Support

For support contact <mailto:support-3d@cognite.com>

