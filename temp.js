import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 12;
camera.position.x = 4;
camera.position.y = 2;

const clock = new THREE.Clock();

// Helpers
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const controls = new OrbitControls( camera, renderer.domElement );
// controls.update();

const loader = new GLTFLoader();
const rgbeLoader = new RGBELoader();
rgbeLoader.load('/models/Environments/environment4.hdr', function(texture){
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment  = texture;

    loader.load( '/models/showroom2/scene.gltf', function ( gltf ) {
	    scene.add( gltf.scene );

        loadCarModel();
    }, undefined, function ( error ) {
	    console.error( error );
    });
});
function loadCarModel() {
    loader.load('/models/Cars/MercedesAmgGT/scene.gltf', function (gltf) {
        const car = gltf.scene;
        car.position.set(8.417655893865991, 0,-7.220616684958802); // Adjust the position as needed
        // car.rotation.y = Math.PI /2;
        const scale = 1; // Adjust this value to the desired scale
        car.scale.set(scale, scale, scale);

        scene.add(car);
        console.log("car loaded");
    }, undefined, function (error) {
        console.error('An error happened', error);
    });
}


// Add some basic lighting
const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
scene.add( ambientLight );

const objects = [];

let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

const controls = new PointerLockControls( camera, document.body );

const blocker = document.getElementById( 'blocker' );
const instructions = document.getElementById( 'instructions' );

instructions.addEventListener( 'click', function () {

    controls.lock();

} );

controls.addEventListener( 'lock', function () {

    instructions.style.display = 'none';
    blocker.style.display = 'none';

} );

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

raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, + 1, 0 ), 0, 10 );


// Animation loop
function animate() {
    requestAnimationFrame(animate);
    // controls.update();
    // fps.update(clock.getDelta());

    const time = performance.now();

    if ( controls.isLocked === true ) {

        // raycaster.ray.origin.copy( controls.getObject().position );
        console.log(controls.getObject().position );
        // raycaster.ray.origin.y -= 10;

        // const intersections = raycaster.intersectObjects( objects, false );

        // const onObject = intersections.length > 0;

        const delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        // if ( onObject === true ) {

        //     velocity.y = Math.max( 0, velocity.y );
        //     canJump = true;

        // }
        velocity.y = Math.max( 0, velocity.y );
        canJump = true

        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );

        controls.getObject().position.y += ( velocity.y * delta ); // new behavior

        if ( controls.getObject().position.y < 10 ) {

            velocity.y = 0;
            controls.getObject().position.y = 2;

            canJump = true;

        }

    }

    prevTime = time;

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
