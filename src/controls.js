import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { camera, renderer,scene } from './scene.js';
import { cars } from './showroom.js';


export const objects = [];
let raycaster;

export let moveForward = false;
export let moveBackward = false;
export let moveLeft = false;
export let moveRight = false;
export let canJump = false;

export let prevTime = performance.now();
export const velocity = new THREE.Vector3();
export const direction = new THREE.Vector3();
export const vertex = new THREE.Vector3();
export const color = new THREE.Color();

export const controls = new PointerLockControls( camera, document.body );

const blocker = document.getElementById( 'blocker' );
const instructions = document.getElementById( 'instructions' );

instructions.addEventListener( 'click', function () {
    controls.lock();
});

controls.addEventListener( 'lock', function () {
    instructions.style.display = 'none';
    blocker.style.display = 'none';
});

controls.addEventListener( 'unlock', function () {
    blocker.style.display = 'block';
    instructions.style.display = '';
} );


scene.add( controls.getObject() );

const onKeyDown = function ( event ) {

    switch ( event.code ) {

        case 'ArrowUp':
        case 'KeyW':
            moveForward = true;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = true;
            break;

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = true;
            break;

        case 'ArrowRight':
        case 'KeyD':
            moveRight = true;
            break;

        case 'Space':
            if ( canJump === true ) velocity.y += 350;
            canJump = false;
            break;

    }

};

const onKeyUp = function ( event ) {
    switch ( event.code ) {

        case 'ArrowUp':
        case 'KeyW':
            moveForward = false;
            break;

        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = false;
            break;

        case 'ArrowDown':
        case 'KeyS':
            moveBackward = false;
            break;

        case 'ArrowRight':
        case 'KeyD':
            moveRight = false;
            break;

    }

};

document.addEventListener( 'keydown', onKeyDown );
document.addEventListener( 'keyup', onKeyUp );