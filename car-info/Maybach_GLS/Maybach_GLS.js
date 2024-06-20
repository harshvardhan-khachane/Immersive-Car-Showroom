import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-0.3, 4.6, 9.7);

const loader = new GLTFLoader();
const rgbeLoader = new RGBELoader();

const light = new THREE.AmbientLight(0x404040, 100); 
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
scene.add(directionalLight);


rgbeLoader.load(
    '/models/Environments/environment3.hdr',
    function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;

        loader.load('/models/Cars/MaybachGLS/scene.gltf', function (gltf) {
            const car = gltf.scene;
            const scale = 1.8;
            car.scale.set(scale, scale, scale);
            scene.add(car);
            car.position.set(0, 0.5, 0);
            addInfiniteFloor();
            scene.dispatchEvent({ type: 'loaded' });
            console.log("AMG Loaded");
            rotateCamera();
        }, undefined, function (error) {
            console.error(error);
        });
    },
    undefined,
    function (error) {
        console.error(error);
        alert("Failed to load HDR environment map. Please try again later.");
    }
);

function addInfiniteFloor() {
    const floorGeometry = new THREE.PlaneGeometry(10000, 10000); 
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xCDE5E2, roughness: 0.5 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; 
    floor.position.y = 0.5; 
    scene.add(floor);
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-container').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

let rotateAnimationId;

function rotateCamera() {
    const speed = 0.0005; 
    function update() {
        camera.position.x = 5.7 * Math.sin(Date.now() * speed);
        camera.position.z = 5.7 * Math.cos(Date.now() * speed);
        camera.lookAt(0, 0, 0);
        rotateAnimationId = requestAnimationFrame(update);
    }
    update();
}

function animate() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
