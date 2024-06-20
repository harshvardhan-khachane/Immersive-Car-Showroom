import { scene, camera, clock, renderer, ambientLight } from './src/scene.js';
import * as THREE from 'three';
import {
    controls,
    velocity,
    direction,
    moveBackward,
    moveForward,
    moveLeft,
    moveRight,
    objects,
} from './src/controls.js';
import { cars, loadingManager } from './src/showroom.js';

let canJump = true;
export let prevTime = performance.now(); 

const progressBar = document.getElementById('progress-bar');
loadingManager.onProgress = function ( url, loaded, total ) {
    progressBar.value = (loaded / total) * 100;
};

const progressBarContainer = document.querySelector('.progress-bar-container');
loadingManager.onLoad = function(){
    progressBarContainer.style.display = 'none';
}

function animate() {
    requestAnimationFrame(animate);
    const time = performance.now();
    if (controls.isLocked === true) {

        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 25.0 * delta;
        velocity.z -= velocity.z * 25.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize();

        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);

        controls.getObject().position.y += (velocity.y * delta);

        if (controls.getObject().position.y < 50) {
            velocity.y = 0;
            controls.getObject().position.y = 1.5;
            canJump = true;
        }
        if(controls.getObject().position.x < -12){
            controls.getObject().position.x = -11.9999999999;
        }
        if(controls.getObject().position.x > 12){
            controls.getObject().position.x = 12;
        }
        
        if(controls.getObject().position.z < -12){
            controls.getObject().position.z = -11.99999999999;
        }
        if(controls.getObject().position.z > 12){
            controls.getObject().position.z = 12;
        }
    }

    prevTime = time;

    renderer.render(scene, camera);
}
animate();

export const raycaster = new THREE.Raycaster();
document.addEventListener('pointerdown', function (event) {
  if (controls.isLocked === true) {
    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    const intersects = raycaster.intersectObjects(cars, true);
    if(intersects[0].distance <= 5){
        if (intersects.length > 0) {
            let intersectedObject = intersects[0].object;
            
            while (intersectedObject.parent && !intersectedObject.parent.isScene) {
                intersectedObject = intersectedObject.parent;
            }
            
            console.log(`Intersected Car: ${intersectedObject.name}`);
            const carName = intersectedObject.name;
            const targetUrl = `/car-info/${carName}/${carName}.html`;
            window.location.href = targetUrl;
        }
    }
  }
});

  
  
  