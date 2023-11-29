
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js'

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

import * as CANNON from 'cannon';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';



function doThreeJS(){

  

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const cenaarray: THREE.Object3D<THREE.Object3DEventMap>[]= [];
  const Shitarray: THREE.Object3D<THREE.Object3DEventMap>[] = [];

  const etiquetasRenderer = new CSS2DRenderer();
const listener = new THREE.AudioListener();
  camera.add( listener );

  const sound = new THREE.Audio( listener );
  const audioLoader = new THREE.AudioLoader();
  audioLoader.load( 'audio/wineGlassClink.wav', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( false );
    sound.setVolume( 0.5 );
  });
  etiquetasRenderer.setSize(window.innerWidth, window.innerHeight); //le damos tamaño
  etiquetasRenderer.domElement.style.position = 'absolute'; //esta propiedad
  etiquetasRenderer.domElement.style.top = '0px';//y esta propiedad son para poner encima de nuestra escena de threeJs
  document.body.appendChild(etiquetasRenderer.domElement); //lo añadimos al DOM, posteriormente vamos a animate y resize y lo añadimos
  etiquetasRenderer.domElement.style.pointerEvents = 'all'; //sino, los orbitControls no van a jalar porque los eventos de mouse
  //son registrados por el etiquetasRenderer
  etiquetasRenderer.domElement.style.color = "#ffffff";

  //Color fondo
  scene.background = new THREE.Color('skyblue');

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
let Shrek: THREE.Object3D<THREE.Object3DEventMap>;
let shit: THREE.Object3D<THREE.Object3DEventMap>;
let cena: THREE.Object3D<THREE.Object3DEventMap>;

const boton = document.createElement('button');  
boton.textContent = 'Reiniciar';
boton.addEventListener('click',()=>{
  window.location.reload();
})


const ptool = document.createElement('p');  
ptool.textContent = 'Perdiste';
const pContainer = document.createElement('div');
pContainer.appendChild(ptool);
const cPointLabel = new CSS2DObject(pContainer);
cPointLabel.position.set(0,1,0);

let loaded = false;

const shitMaterial = new THREE.MeshPhongMaterial({
  color:0x339944,       
  side:THREE.DoubleSide
});
const ShitGeometry = new THREE.SphereGeometry(2);
const ShitMesh = new THREE.Mesh(ShitGeometry,shitMaterial);
//planoMesh.rotateX(-90 * (Math.PI/180))

// scene.add(planoMesh);  
ShitMesh.receiveShadow = true;  
// const ShitPhysM = new CANNON.Material("reboton");

const ShitBody: any = new CANNON.Body({
  //shape: new CANNON.Plane(),

    shape: new CANNON.Sphere(2),
    position: new CANNON.Vec3(5,0,-10),
    type: CANNON.Body.KINEMATIC,
    mass: 2,

  // position: new CANNON.Vec3(20,0,0)
})
const world = new CANNON.World();
world.gravity = new CANNON.Vec3(0,-9.81,0);

ShitBody.colitionResponse = false;
ShitBody.velocity.set(0,0,-1)
world.addBody(ShitBody);
let ShrekModel:any;
loader.load(
	// resource URL
	'Shrek/scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

    Shrek = gltf.scene;
		scene.add( Shrek);
    loaded=true;
    ShrekModel = Shrek

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
	// function ( error ) {

	// 	console.log( 'An error happened' );

	// }
);



loader.load(
	// resource URL
	'Shit/scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

    shit = gltf.scene;
		//scene.add( shit);
    loaded=true;
    for (let i=0; i<20; i++){
      let x = Math.floor (Math.random()*26)-10;
      let y = Math.floor (Math.random()*26)-10;
      let z = Math.random() * -10 - 15
      const modelClone = SkeletonUtils.clone(shit)
      scene.add( modelClone);
      modelClone.position.set(x,y,z) 
      Shitarray.push(modelClone)
    }
    shit.position.set(5 ,0, -20)

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
	// function ( error: ) {

	// 	console.log( 'An error happened' );

    
	// }
);


  loader.load(
    // resource URL
    
    'Cena/scene.gltf',
    // called when the resource is loaded
    function ( gltf ) {
      
      cena = gltf.scene;
      
      //scene.add( cena);
      loaded=true;

      for (let i = 0; i < 15; i++) {
        const modelClone = SkeletonUtils.clone(cena);
        scene.add( modelClone);
        // modelClone.position.x = i
        cenaarray.push(modelClone)
        let x = Math.random()*20-10;//-10 a 10
          let y = -8;
          let z = Math.random() * -10 - 15
          modelClone.position.set(x,y,z)      //-15 a -25    
      }
      
    },
    
    // called while loading is progressing
    function ( xhr ) {
      
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      
    },
    // called when loading has errors
    // function ( error ) {
      
    //   console.log( 'An error happened' );
      
    // }
    );

    window.addEventListener("keydown",(event)=>{
      // console.log("click",event.key)

      if(event.key == 'ArrowUp' || event.key == 'w'){
        Shrek.position.y += 0.1;
      }
      
      if(event.key == 'ArrowDown' || event.key == 's'){
        Shrek.position.y -= 0.1;
      }

      if(event.key == 'ArrowLeft' || event.key == 'a'){
        Shrek.position.x -= 0.1;
      }

      if(event.key == 'ArrowRight' || event.key == 'd'){
        Shrek.position.x += 0.1;
      }

      
    })

    //window.addEventListener('keyup')

    
    
cube.position.set(0, -5, 5);

  function animate() {
    requestAnimationFrame( animate );

    const delta = clock.getDelta();
    

    // shit.rotation.x += 0.1 * delta;
    // shit.rotation.y += 0.1 + delta;


    if (loaded){
      



      

      // ship.translateZ(delta*13);
      // ship.lookAt(shit.position);
      Shitarray.forEach(function (shit) {
        //console.log(shit);
      if(shit != undefined)
      {
        shit.translateZ(delta *5);
        if ( shit.position.z>=20 )
        {
          let x = Math.floor (Math.random()*26)-10;
          let y = Math.floor (Math.random()*26)-10;
          let z = Math.random() * -10 - 15
          shit.position.set(x,y,z)
        }
      }

      let distance = shit.position.distanceTo(ShrekModel.position)

          if (distance < 1.5){
            console.log
            scene.add(cPointLabel);
            pContainer.appendChild(boton)
            
        if(sound.isPlaying){
          sound.stop();      
        }
        sound.play();
          }

    });

      cenaarray.forEach(function(cena){
        cena.translateZ(delta *5);
        if ( cena.position.z>=15 )
        {
          let x = Math.random()*20-10;//-10 a 10
          let y = -8;
          let z = Math.random() * -10 - 15
          cena.position.set(x,y,z)      //-15 a -25    
        }      

    });
    
    }
      // shit.lookAt(ShitBody.position);
    

    // required if controls.enableDamping or controls.autoRotate are set to true
	  controls.update();
    etiquetasRenderer.render(scene,camera);
    renderer.render( scene, camera );
  }

  const rgbloader = new RGBELoader(); 
  rgbloader.load('/environments/christmas_photo_studio_07_1k.hdr',
  function(texture){
  
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment= texture;

  })
    

  const jpgloader = new THREE.TextureLoader();
  
  jpgloader.load(
    'environments/christmas_photo_studio_07.jpg',
    (texture) =>{
      texture.mapping = THREE.EquirectangularRefractionMapping;
      scene.background = texture;}
  );

  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    etiquetasRenderer.setSize( window.innerWidth, window.innerHeight );
  }
  
  animate(); //Iniciamos el loop
}



const App = () => {

  return (
    <>
      <div id="info">Puntuacion: 0</div>
      {doThreeJS()}
    </>
  )
}


export default App

