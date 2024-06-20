import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { scene } from './scene.js';

export const loadingManager = new THREE.LoadingManager();
const loader = new GLTFLoader(loadingManager);
const rgbeLoader = new RGBELoader(loadingManager);
export const cars = [];
export const carBoundingBoxes = [];

rgbeLoader.load('/models/Environments/environment6.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;

    loader.load('/models/showroom2/scene.gltf', function (gltf) {
        scene.add(gltf.scene);
        scene.dispatchEvent({ type: 'loaded' });
        console.log("Page loaded");

        AmgGT();
        A45AMG();
        G63();
        SClass();
        Maybach();
        MaybachGLS();
        S63();
        S65();
        V8();
    }, undefined, function (error) {
        console.error(error);
    });
});

function AmgGT() {
    loader.load('/models/Cars/MercedesAmgGT/scene.gltf', function (gltf) {
        const carAmgGT = gltf.scene;
        carAmgGT.position.set(10.015454377641102, 0, -7.35655052433106);
        const scale = 0.9;
        carAmgGT.scale.set(scale, scale, scale);
        carAmgGT.name = "Mercedes_AMG_GT";
        cars.push(carAmgGT);
        scene.add(carAmgGT);
        console.log("AmgGT loaded");

        const carBoundingBox = new THREE.Box3().setFromObject(carAmgGT);
        carBoundingBoxes.push(carBoundingBox);
    }, undefined, function (error) {
        console.error('An error happened', error);
    });
}

function A45AMG() {
    loader.load('/models/Cars/A45AMG/scene.gltf', function (gltf) {
        const carA45AMG = gltf.scene;
        carA45AMG.rotation.y = Math.PI;
        carA45AMG.position.set(-0.022228267176157, 0, -6.150321832184348);
        const scale = 0.21; 
        carA45AMG.scale.set(scale, scale, scale);
        carA45AMG.name = "A45_AMG";
        cars.push(carA45AMG);
        scene.add(carA45AMG);
        console.log("A45AMG loaded");

        const carBoundingBox = new THREE.Box3().setFromObject(carA45AMG);
        carBoundingBoxes.push(carBoundingBox);
    }, undefined, function (error) {
        console.error('An error happened', error);
    });
}

function G63() {
    loader.load('/models/Cars/G63/scene.gltf', function (gltf) {
        const carG63 = gltf.scene;
        carG63.position.set(10.650982102625594, 0, 8.187567144479909);
        carG63.rotation.y = Math.PI;
        const scale = 1;
        carG63.scale.set(scale, scale, scale);
        carG63.name = "G63";
        cars.push(carG63);
        scene.add(carG63);
        console.log("G63 loaded");

        const carBoundingBox = new THREE.Box3().setFromObject(carG63);
        carBoundingBoxes.push(carBoundingBox);
    }, undefined, function (error) {
        console.error('An error happened', error);
    });
}

function SClass() {
    loader.load('/models/Cars/SClass/scene.gltf', function (gltf) {
        const carSClass = gltf.scene;
        carSClass.position.set(3.764106059003382, 0, 8.487567144479909);
        carSClass.rotation.y = Math.PI;
        const scale = 1.19;
        carSClass.scale.set(scale, scale, scale);
        carSClass.name = "S_Class";
        cars.push(carSClass);
        scene.add(carSClass);
        console.log("S Class loaded");

        const carBoundingBox = new THREE.Box3().setFromObject(carSClass);
        carBoundingBoxes.push(carBoundingBox);
    }, undefined, function (error) {
        console.error('An error happened', error);
    });
}

function Maybach() {
    loader.load('/models/Cars/Maybach/scene.gltf', function (gltf) {
        const carMaybach = gltf.scene;
        carMaybach.position.set(-5.022228267176157, 0, -6.350321832184348);
        carMaybach.rotation.y = Math.PI / 2;
        const scale = 1.15;
        carMaybach.scale.set(scale, scale, scale);
        carMaybach.name = "Maybach";
        cars.push(carMaybach);
        scene.add(carMaybach);
        console.log("Maybach loaded");

        const carBoundingBox = new THREE.Box3().setFromObject(carMaybach);
        carBoundingBoxes.push(carBoundingBox);
    }, undefined, function (error) {
        console.error('An error happened', error);
    });
}

function MaybachGLS() {
    loader.load('/models/Cars/MaybachGLS/scene.gltf', function (gltf) {
        const carMaybachGLS = gltf.scene;
        carMaybachGLS.position.set(-10.654501862872088, 0, -6.906103613548317);
        const scale = 1;
        carMaybachGLS.scale.set(scale, scale, scale);
        carMaybachGLS.name = "Maybach_GLS";
        cars.push(carMaybachGLS);
        scene.add(carMaybachGLS);
        console.log("Maybach GLS loaded");

        const carBoundingBox = new THREE.Box3().setFromObject(carMaybachGLS);
        carBoundingBoxes.push(carBoundingBox);
    }, undefined, function (error) {
        console.error('An error happened', error);
    });
}

function S63() {
    loader.load('/models/Cars/S63/scene.gltf', function (gltf) {
        const carS63 = gltf.scene;
        carS63.position.set(4.738995809065105, 0, -6.400796341153642);
        carS63.rotation.y = Math.PI;
        const scale = 1.2;
        carS63.scale.set(scale, scale, scale);
        carS63.name = "S63";
        cars.push(carS63);
        scene.add(carS63);
        console.log("S63 loaded");

        const carBoundingBox = new THREE.Box3().setFromObject(carS63);
        carBoundingBoxes.push(carBoundingBox);
    }, undefined, function (error) {
        console.error('An error happened', error);
    });
}

function S65() {
    loader.load('/models/Cars/S65/scene.gltf', function (gltf) {
        const carS65 = gltf.scene;
        carS65.position.set(-0.63660259166009, 0, 7.9052147489574764);
        carS65.rotation.y = Math.PI;
        const scale = 1.15;
        carS65.scale.set(scale, scale, scale);
        carS65.name = "S65";
        cars.push(carS65);
        scene.add(carS65);
        console.log("S65 loaded");

        const carBoundingBox = new THREE.Box3().setFromObject(carS65);
        carBoundingBoxes.push(carBoundingBox);
    }, undefined, function (error) {
        console.error('An error happened', error);
    });
}

function V8() {
    loader.load('/models/Cars/V8/scene.gltf', function (gltf) {
        const carV8 = gltf.scene;
        carV8.position.set(-7.884721241253231, 0, 4.660656974090657);
        carV8.rotation.y = Math.PI;
        const scale = 0.09;
        carV8.scale.set(scale, scale, scale);
        carV8.name = "V8";
        cars.push(carV8);
        scene.add(carV8);
        console.log("V8 loaded");

        const carBoundingBox = new THREE.Box3().setFromObject(carV8);
        carBoundingBoxes.push(carBoundingBox);
    }, undefined, function (error) {
        console.error('An error happened', error);
    });
}
