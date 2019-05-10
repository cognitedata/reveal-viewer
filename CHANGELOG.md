# Changelog
All notable changes to this project will be documented in this file.

## [5.0.6] - 2019-05-10
### Fixed
 - Improved first person camera control

## [5.0.5] - 2019-05-08
### Fixed
 - Fixed crashes in Chrome 74 on Windows/Linux by not using Web Workers for .ctm parsing

## [5.0.4] - 2019-05-07
### Fixed
 - Issue with `enableKeyboardNavigation` after viewer.dispose is called.

## [5.0.3] - 2019-05-07
### Fixed
 - Issues after `Cognite3DViewer.dispose` has been called.
 - Suddenly disappearing objects when using bounding box filter.
 - Fixed infinite move when pressing Cmd/Ctrl+A.

## [5.0.2] - 2019-05-04
### Fixed
 - Missing geometries if large bounding box filter was used.

## [5.0.1] - 2019-05-03
### Fixed
 - Supporting multiple instances of `mixpanel`.

## [5.0.0] - 2019-05-03
### Added
- Screen space culling based on size of each object to increase frame rate.
- New memory layout to drastically reduce memory usage.
- `Cognite3DViewer.dispose` function which can be called to release all resources and free memory.
- New per pixel clipping API. We now support an arbitrary number of clipping planes.
- Anonymous usage statistics
- Viewer reads `rotation` property from the API. This means models wrongly rotated can be fixed without reuploading a new file.
- New internal file format to reduce loading time.

### Changed
- Removed `matrix` argument from `model.getBoundingBox`. `model.matrix` is now always used.
- Changed `Cognite3DViewer.addModel` `boundingBox` argument to a more general `geometryFilter` object. Use `{ boundingBox }` instead of `boundingBox`.
- Removed `getCanvas` from `Cognite3DViewer`. You can now provide your own DOM element, or if not provided, read it from the `domElement` property. The style width and height of both the default domElement and its internal canvas is 100 %.
- Replaced old slicing API with new per-pixel clipping API. See documentation.
- `Cognite3DViewer.isSupported` is changed to a static function `Cognite3DViewer.isBrowserSupported`.
- Removed `projectName` from `options` in `Cognite3DViewer.addModel` options.

### Fixed
- Near plane being too far away on some scenes that could clip some objects.
- TypeScript definitions (now most of the code base is TypeScript too).
- Render issues (wrong resolution) when browser was using zoom.
- Several improvements decreasing loading time and increasing frame rate.
- Issues with camera control if the frame rate is low.
- Improved quality and performance on screen space ambient occlusion (SSAO).
- Documented `THREE` and `TWEEN`.
- `addObject3D` and `removeObject3D` triggers a new frame.
- Objects added using `addObject3D` are used to calculate near/far plane so they are always visible.

## [4.1.1] - 2019-03-07
### Fixed
- Bad highlighting of selected bright objects 

## [4.1.0] - 2019-03-07
### Added
- Auto adjustment of brightness 
- Undocumented `brightness` parameter
- `getCanvas` method on `Cognite3DViewer`

### Changed
- Renamed private methods and variables to `_variableName`
- Removed deprecated `start` and `stop`
- Deprecated `canvas` member variable on `Cognite3DViewer`

### Fixed
- Adjusted screen space culling parameters
- Sudden jumps when scrolling after zooming in on a bounding box

## [4.0.4] - 2019-03-02
### Added
- Camera speed and near/far plane is based on mean object size in the scene

### Fixed
- Improved zoom when pinching on touch devices
- Suddenly disappearing objects 

## [4.0.3] - 2019-02-27
### Fixed
- Bad zooming if canvas was not in top left corner

## [4.0.2] - 2019-02-20
### Fixed
- Removed sdk as dependency

## [4.0.1] - 2019-02-20
### Fixed
- Broken world positions in intersection
- Wrong type script definition for `getBoundingBox` on `Cognite3DModel`
- Updated type script definitions

## [4.0.0] - 2019-02-20
### Added
- Dynamic screen space culling to increase frame rate

### Changed
- Using the new SDK

### Fixed
- Viewer can be loaded (without working) in Internet Explorer 11

### Removed
- getAssetMappingsFromNodeId (replaced by SDK equivalent: https://js-sdk-docs.cogniteapp.com/classes/threed.html#listassetmappings)
- getAssetMappingsFromAssetId (replaced by SDK equivalent: https://js-sdk-docs.cogniteapp.com/classes/threed.html#listassetmappings)
- getSectorsFromBoundingBox (replaced by SDK equivalent: https://js-sdk-docs.cogniteapp.com/classes/threed.html#listsectors)
- getNode (replaced by SDK equivalent: https://js-sdk-docs.cogniteapp.com/classes/threed.html#listnodes)

## [3.8.1] - 2018-11-30
### Fixed
- Fixed incorrect offset values from `Cognite3DViewer.on('click')`

## [3.8.0] - 2018-11-27
### Added
- New primitive Trapezium
- Experimental getSubtreeNodeIdsFromTreeIndex

### Fixed
- Fixed TouchEvent exception in Firefox
- Reuse shader code: ellipsoid, sphere and mul3

## [3.7.3] - 2018-11-19
### Fixed
- Fixed bad bounding boxes for some geometry primitives.
- Fixed bug in `resetNodeColor`.
- Fix `Cognite3DViewer.on('click', ...)` for mobile phones (iOS).

### Added
- Exposing `TWEEN` to do animation. (`import { TWEEN } from '@cognite/3d-viewer';`)

## [3.7.2] - 2018-11-14
### Fixed
- Fixed issue where `noBackground` to `Cognite3DViewer.constructor` was ignored.
- Corrected validation to check if `Cognite3DViewer.canvas` is visible in DOM (avoid WebGL warnings).

### Added
- Added test to verify correct timestamps on build files.
- Improved documentation in `README.md`:
  - Added code snippet for using saved camera position from the REST API.
  - Updated docs for `Cognite3DModel.getBoundingBox` to reflect that resulting bounding box is in model space by default.
- Improved test to catch the fixes that was solved.

## [3.7.1] - 2018-11-13
### Fixed
- Improved loading time by caching bounding boxes.

## [3.7.0] - 2018-11-12
### Added
- Added `worldToScreen` function on `Cognite3DViewer` to calculate pixel coordinates of a point.
- Added `cameraChange` event on `Cognite3DViewer`.

### Fixed
- Disabled GPU vertex culling since this introduced artifacts on Android phones.

## [3.6.0] - 2018-11-12
### Added
- Added optional ghost effect when hiding nodes.

### Changed
- Replaced `makeGray` in `hideNode` and `hideAllNodes` with `ghost` to create ghost effect.

## [3.5.3] - 2018-11-11
### Fixed
- Increased SSAO depth precision for mobile.

## [3.5.2] - 2018-11-11
### Fixed
- Selected nodes cannot be culled.

## [3.5.1] - 2018-11-11
### Fixed
- `getScreenshot` was broken in 3.5.0.

## [3.5.0] - 2018-11-11
### Added
- Added Screen Space Ambient Occlusion (SSAO) for increased depth perception.
- Added slicing support. See documentation for API.
- Improved lights in the scene.
- Increased performance on instanced meshes (identical geometries).
- General performance improvements on primitives.

### Fixed
- Bad bounding boxes on shaders.

## [3.4.1] - 2018-11-07
### Added
- Added option to set custom highlight color for nodes in `Cognite3DViewer.constructor`.
- Added `boundingBox` to options for `Cognite3DModelLoader` and `Cognite3DViewer.addModel`.
- Added changelog file.

### Fixed
- Added missing `getCameraTarget` function to TypeScript definition file.
- Fixed compile errors for TypeScript definition file.

### Changed
- `Cognite3DModel.getBoundingBox` now returns bounding boxes in model space (local).
- `Cognite3DModel.getBoundingBox` now supports a third parameter `matrix`.

### Removed
- Deprecated `Cognite3DViewer.start`, `Cognite3DViewer.stop`. The viewer will start rendering once `Cognite3DViewer.canvas` is attached to the DOM and stop when the canvas is deattached.
- Removed `sectors` from options to `Cognite3DModelLoader` and from `Cognite3DViewer.addModel`.

## [3.3.1] - 2018-10-30
### Added
- TypeScript definition file.

## [3.3.0] - 2018-10-30
### Added
- `Cognite3DViewer.getIntersectionFromPixel`.
- `Cognite3DModel.resetNodeColor`.
- Optimized rendering by pre-uploading geometries to GPU.
- Dynamic near / far planes for the camera.

### Removed
- Deprecated `Cognite3DModel.getNodeIdFromPixel` (use `Cognite3DViewer.getIntersectionFromPixel` instead).

## [3.2.2] - 2018-10-18
### Added
- Added rendering optimizations for frustum culling & screen space culling.
- Added support for object picking on iOS.
- Optimized rendering of some geometries.

### Fixed
- Fixed bug with inaccurate object picking for very large screens.
- Fixed missing return value for `Cognite3DModel.getSubtreeNodeIds` in the docs.
- Fixed bug with `Cognite3DModel.setNodeColor` throwing an error.

## [3.2.1] - 2018-10-14
### Fixed
- Fixed bug where the viewer didn't render all geometries correctly when multiple viewers were used on the same page.

## [3.2.0] - 2018-10-14
### Added
- Free up memory when data is not needed anymore.

### Changed
- Changed `Cognite3DModel.getNodeColor` to not return alpha value of the color.
- Changed `Cognite3DModel.setNodeColor` to not take alpha value as a parameter.
- Adjusted default light settings (reduced brightness).
- Reduced amount of data sent to the GPU.
- Added `makeGray` property to `Cognite3DModel.hideNode` and `Cognite3DModel.hideAllNodes`.

## [3.1.1] - 2018-10-08
### Added
- Optimized `Cognite3DModel.setNodeColor`, `Cognite3DModel.hideNode`, `Cognite3DModel.hideAllNodes`, `Cognite3DModel.showNode`, `Cognite3DModel.showAllNodes`, `Cognite3DModel.selectNode`, `Cognite3DModel.deselectNode`, `Cognite3DModel.deselectAllNodes` to handle many updates at the same time.
- Added `sectors` option to `Cognite3DViewer` constructor to load only a part of a model.
- Added `viewCube` option to `Cognite3DViewer` constructor.

### Changed
- Updated `three.js` to r96.

### Fixed
- Fixed wrong bounding box for some geometries.

## [3.0.0] - 2018-09-28
### Added
- Optimized memory usage
- Optimized rendering of some geometries.
- Added `Cognite3DModel.showNode`, `Cognite3DModel.hideNode`, `Cognite3DModel.showAllNodes`.
