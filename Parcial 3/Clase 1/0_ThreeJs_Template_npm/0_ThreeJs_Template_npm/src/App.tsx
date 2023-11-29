
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function doThreeJS(){
 
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  //Color fondo
  scene.background = new THREE.Color(0.25,0.6,0.95);

  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0xe0e0e0,1);
  scene.add(ambientLight);
  
  //Luz direccional
  const light = new THREE.DirectionalLight(0xffffff,0.6);
  light.position.set(0,4,2);
  scene.add(light);
  
  const renderer = new THREE.WebGLRenderer();
  //renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  //renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  //renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );

  const controls = new OrbitControls( camera, renderer.domElement );

  document.body.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );  
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;
  const clock = new THREE.Clock();
const loader = new GLTFLoader();
let ship: THREE.Object3D<THREE.Object3DEventMap>;
let loaded = false;

loader.load(
	// resource URL
	'models/spaceship.gltf',
	// called when the resource is loaded
	function ( gltf ) {

    ship = gltf.scene;
		scene.add( ship);
    loaded=true;

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

cube.position.set(0, -5, 5);

  function animate() {
    requestAnimationFrame( animate );

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    cube.rotation.x += 2 * delta;
    cube.rotation.y += 2 + delta;

    const scale = 25;
    const x = scale * (Math.cos(time) / (1+ Math.sin(time) **2));
    const z = scale * (Math.sin(time) * Math.cos(time) / (1+ Math.cos(time) **2));

    cube.position.set(x,0,z);
    

    if (loaded){
      
      ship.translateZ(delta*13);
      ship.lookAt(cube.position);
      
    }

    // required if controls.enableDamping or controls.autoRotate are set to true
	  controls.update();
    renderer.render( scene, camera );
  }



  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  
  animate(); //Iniciamos el loop
}


const App = () => {

  return (
    <>
      <div id="info">Buenas</div>
      {doThreeJS()}
    </>
  )
}


export default App

