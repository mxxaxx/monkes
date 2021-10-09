import './style.css'

import * as THREE from 'https://cdn.jsdelivr.net/npm/three.js@0.77.1/shim.min.js';

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three-orbitcontrols@2.110.3/OrbitControls.min.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);


renderer.render(scene, camera);







const monkeyTexture = new THREE.TextureLoader().load('monke.jpg');

const monkey = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10), 
  new THREE.MeshBasicMaterial( {map: monkeyTexture })
)

scene.add(monkey);

function addMonkey(){
  const monkeyTexture = new THREE.TextureLoader().load('monke.jpg');
  const miniMonkey = new THREE.Mesh(
    new THREE.SphereGeometry(1, 10, 10), 
    new THREE.MeshBasicMaterial( {map: monkeyTexture })
  )


  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100));

  miniMonkey.position.set(x, y, z);
  return miniMonkey;
}


const monkeys = Array(200);
for (let i = 0; i < monkeys.length;i++){
  monkeys[i] = addMonkey();
  scene.add(monkeys[i]);
}




function animate(){
  requestAnimationFrame( animate );
  monkey.rotation.x += 0.01;
  monkey.rotation.y -= 0.01;
  monkey.rotation.z += 0.009;


  controls.update()

  for (let i = 0; i < monkeys.length;i++){
    monkeys[i].rotation.z += 0.001;
    monkeys[i].rotation.x += 0.01;
    monkeys[i].rotation.y += 0.01;
  }


  renderer.render( scene, camera);
}

animate();