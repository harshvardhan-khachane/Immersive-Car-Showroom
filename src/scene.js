import * as THREE from 'three';

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
camera.position.set(0,1.5, 5); 

export const clock = new THREE.Clock();


export const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
