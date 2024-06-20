import * as THREE from 'three';
import { Octree, Capsule } from 'three'; 

const worldOctree = new Octree(); // Initialize Octree for collision detection
const playerCollider = new Capsule(new THREE.Vector3(0, 1.5, 0), new THREE.Vector3(0, 1.5, 0), 0.35);
