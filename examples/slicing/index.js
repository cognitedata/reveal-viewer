import * as cognite from '@cognite/3d-viewer';
import queryString from 'query-string';
import { THREE } from '@cognite/3d-viewer';

class IntersectionPlane extends THREE.Mesh {
  constructor(camera) {
    super(
      new THREE.PlaneBufferGeometry(100000, 100000, 2, 2),
      new THREE.MeshBasicMaterial({
        visible: false,
        wireframe: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.1,
      })
    );
    this.camera = camera;
  }

  updateMatrixWorld() {
    this.quaternion.copy(this.camera.quaternion);
    super.updateMatrixWorld();
  }
}

const main = async () => {
  const viewerOptions = {
    domElement: document.getElementById('wrapper'),
  };

  const primitivesLoaderOptions = {
    localPath: 'primitives',
  };

  const raycaster = new THREE.Raycaster();

  const viewer = new cognite.Cognite3DViewer(viewerOptions);
  const model = await viewer.addModel(primitivesLoaderOptions);
  window.viewer = viewer;
  window.model = model;

  viewer.setCameraPosition(new THREE.Vector3(370, 602, 1495));
  viewer.setCameraTarget(new THREE.Vector3(-694, -385, 131));
  const geometry = new THREE.BoxBufferGeometry(100, 100, 100);
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  // TODO do not use private accessor for camera
  const intersectionPlane = new IntersectionPlane(viewer._camera);

  mesh.position.x = -300;
  mesh.position.y = 50;
  mesh.position.z = 0;

  viewer.addObject3D(mesh);
  viewer.addObject3D(intersectionPlane);

  let previousPoint = null;

  const update = () => {
    // TODO do not use private accessor to force rendering
    viewer._renderController.needsRedraw = true;
    intersectionPlane.position.copy(mesh.position);

    const xPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), -mesh.position.x);
    const yPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), mesh.position.y);
    viewer.setSlicingPlanes([xPlane, yPlane]);
  };

  const mouseDown = event => {
    const x = (2.0 * event.offsetX) / viewer.domElement.clientWidth - 1.0;
    const y = 1.0 - (2.0 * event.offsetY) / viewer.domElement.clientHeight;
    const mousePosition = new THREE.Vector2(x, y);

    // TODO do not use private accessor for camera
    raycaster.setFromCamera(mousePosition, viewer._camera);

    const intersections = raycaster.intersectObjects([mesh]);
    if (intersections.length === 0) {
      return false;
    }

    const planeIntersections = raycaster.intersectObjects([intersectionPlane]);
    if (planeIntersections.length === 0) {
      return false;
    }

    // TODO do not use private accessor for camera controller
    viewer._disableCameraController();

    const firstIntersection = planeIntersections[0];
    previousPoint = firstIntersection.point;
    viewer.domElement.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
    return true;
  };

  const mouseMove = event => {
    const x = (2.0 * event.offsetX) / viewer.domElement.clientWidth - 1.0;
    const y = 1.0 - (2.0 * event.offsetY) / viewer.domElement.clientHeight;
    const mousePosition = new THREE.Vector2(x, y);

    raycaster.setFromCamera(mousePosition, viewer._camera);
    const intersections = raycaster.intersectObjects([intersectionPlane]);
    if (intersections.length === 0) {
      return false;
    }

    const firstIntersection = intersections[0];
    const currentPoint = firstIntersection.point;
    const offset = currentPoint.clone().sub(previousPoint);
    mesh.position.add(offset);
    intersectionPlane.position.copy(mesh.position);
    previousPoint.copy(currentPoint);

    update();
    return true;
  };

  const mouseUp = event => {
    // TODO do not use private accessor for camera controller
    viewer._enableCameraController();
    viewer.domElement.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', mouseUp);
    return true;
  };

  viewer.domElement.addEventListener('mousedown', mouseDown);

  update();
};

main();
