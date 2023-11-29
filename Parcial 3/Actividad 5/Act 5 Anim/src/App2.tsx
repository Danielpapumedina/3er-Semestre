import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js'
import { modelPosition } from 'three/examples/jsm/nodes/Nodes.js';

function doThreeJS(){
 
  const dances = ['Happy','HipHop','Macarena','Samba'];
  // let previousAction:THREE.AnimationAction, activeAction : THREE.AnimationAction;
  let waitTimer =1;  
  let nModels = 40;
  let ndance = 1;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  //Color fondo
  scene.background = new THREE.Color(0.4,0.5,0.9); 

  //Luz direccional
  const light = new THREE.DirectionalLight(0xffffff,1);
  light.position.set(0,4,2);
  scene.add(light);
  light.castShadow=true;
  
  //Luz ambiental
  const ambientLight = new THREE.AmbientLight(0xbbccff,1.2);
  scene.add(ambientLight);


  const renderer = new THREE.WebGLRenderer();
  renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;

  const clock = new THREE.Clock();

  const controls = new OrbitControls( camera, renderer.domElement );

  document.body.appendChild( renderer.domElement );

  let model: THREE.AnimationObjectGroup | any;
  let clips: THREE.AnimationClip[] =[];
  let mixer: THREE.AnimationMixer | null;


  const loader = new GLTFLoader();
  loader.load( 'models/robot.gltf', function ( gltf ) {

    model = gltf.scene;
    //scene.add( model );

    clips = gltf.animations;
    // mixer = new THREE.AnimationMixer(model);

    // const clip =THREE.AnimationClip.findByName(clips, dances[ndance])
    // const action = mixer.clipAction(clip);
    // activeAction = action;
    // action.play();

    model.traverse((child:any)=>{
      if(child.isMesh){
        child.castShadow=true;
      }
    })

  }, undefined, function ( e ) {

    console.error( e );

  } );

  camera.position.z = 2;
  camera.position.y = 18;

  const arreglo:any[] = [];
  const planeGeo = new THREE.PlaneGeometry(20,20,1,1);
  const planeMat = new THREE.MeshPhongMaterial({color:0x336699});
  const plane = new THREE.Mesh(planeGeo,planeMat);
  scene.add(plane);
  plane.rotateX(-90*(Math.PI/180));
  plane.receiveShadow=true;

  arreglo.push(plane);

  const cubeG = new THREE.BoxGeometry(1,1,1);
  const cubeM = new THREE.MeshBasicMaterial({color:'white'})
  const cube = new THREE.Mesh(cubeG,cubeM);
  scene.add(cube);
 
  const amplitud = 6
  const frecuencia = 0.1

  const incrementos = (Math.PI*2) / nModels;
  let i = 0;

const mixers: THREE.AnimationMixer[]=[];

const mousePosition = new THREE.Vector2();
const rayCaster = new THREE.Raycaster();

window.addEventListener('mousemove',(e)=>{
  mousePosition.x = (e.clientX / window.innerWidth) * 2-1;
  mousePosition.y = -(e.clientY / window.innerHeight) * 2+1;

  rayCaster.setFromCamera(mousePosition,camera);
  const intersects = rayCaster.intersectObjects(arreglo);
  //console.log(intersects)
  if(intersects.length>0){
    cube.position.copy(intersects[0].point)

    


  }
  
})

  function animate() {
    requestAnimationFrame( animate );
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // cube.position.set(
    //   Math.sin(time * frecuencia) * 10,
    //   0,
    //   Math.cos(time * frecuencia) * 10,
    // );

    
   waitTimer -=delta;
   if(nModels > 0&& waitTimer<=0){
    nModels--;    
    waitTimer=0.1;
    const modelClone = SkeletonUtils.clone(model);
    // modelClone.position.set(
    //   Math.random()*14-7, //x
    //   0, // y
    //   Math.random()*14-7, //z
    //   )

    modelClone.position.set(
      Math.sin(i*incrementos) * amplitud, //x
      0, // y
      Math.cos(i*incrementos) * amplitud, //z
      )
    
      i++;

      // modelClone.rotateY(Math.random()* (Math.PI*2))
      scene.add(modelClone);
      

      const distance = cube.position.distanceTo(modelClone.position);


  
      console.log(cube.position, modelClone.position);
  
      
  
      const mixer = new THREE.AnimationMixer(modelClone);
      const clip = THREE.AnimationClip.findByName(clips, dances[ndance]);
      const action = mixer.clipAction(clip);
      action.play();
      mixers.push(mixer);
      if (distance <= 1.0) {
        
        ndance++; 
      }
    }
  
    if (mixers.length > 0) {
      mixers.forEach(function (mixer) {
        mixer.update(delta);
      });
    }
    
  
    controls.update();
    renderer.render(scene, camera);
  }
  window.addEventListener( 'resize', onWindowResize, false );
  
  function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  
  
  animate(); //Iniciamos el loop
}


const App2 = () => {

  return (
    <>
      {doThreeJS()}
    </>
  )
}

export default App2 
