
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as dat from 'dat.gui'


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
  light.castShadow = true;
  
  const lightH =new THREE.DirectionalLightHelper(light, 5);
  scene.add(lightH);

  

  const lightS = new THREE.CameraHelper(light.shadow.camera);
  scene.add(lightS);
  
  // luz de foco
  const sLight = new THREE.SpotLight('white', 500);
  sLight.position.set(-2,18,2);
  sLight.angle = Math.PI/18;
  sLight.penumbra;
  scene.add(sLight);
  sLight.castShadow = true;

  const sLightH = new THREE.SpotLightHelper(sLight);
  scene.add(sLightH);



  const renderer = new THREE.WebGLRenderer();
  //renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
  //renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
  //renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled=true;

  const controls = new OrbitControls( camera, renderer.domElement );

  document.body.appendChild( renderer.domElement );

  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );  
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  cube.castShadow = true

  const cube2g = new THREE.BoxGeometry( 1, 1, 1 );
  const cube2m = new THREE.MeshPhongMaterial( { color: 0xffffff } );  
  const cube2 = new THREE.Mesh( cube2g, cube2m );
  scene.add( cube2 );
  cube.castShadow = true
  cube.position.y-=2;


  const planeG = new THREE.PlaneGeometry(20,20,1,1);
  const planeM = new THREE.MeshStandardMaterial({color:0xffffff, side:THREE.DoubleSide});
  const plane = new THREE.Mesh(planeG,planeM);
  plane.rotateX(90*(Math.PI/180));
  plane.position.y=-5;
  scene.add(plane);

  camera.position.z = 5;

  const clock = new THREE.Clock()
  let time;

  const gui = new dat.GUI();
  const options = {
    intensidad: 500,
    angle: (Math.PI/2)/2,
    penumbra: 0.5,
    color: 0xffff00,
    wireframe: false,
  }

  gui.add(options, 'intensidad',0 , 1000);
  gui.add(options, 'angle',0, Math.PI/2);
  gui.add(options, 'penumbra',0 ,1);
  gui.add(options,'wireframe').onChange((julion)=>{
    cube2.material.wireframe=julion
  })
  gui.addColor(options,'color').onChange((evento)=>{
    cube2.material.color.set(evento)
  })


//Raycaster
  //en Three js cualquier objeto intersectado por el raycast es añadido a la lista
  //setearemos la camara como la fuente y el mouse como el punto final
  const mousePosition = new THREE.Vector2();

  window.addEventListener('mousemove', function(e){
    //obtenemos las coordenadas normalizadas (de 0 a 1)    
    mousePosition.x =  ( e.clientX / window.innerWidth ) * 2 - 1;
    mousePosition.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

  })

  const rayCaster = new THREE.Raycaster();
  let loaded = false;
  setTimeout(() =>{
    loaded = true
    cube.attach(cube2);
  },1000)


  cube2.name = "Cubo2";

  function animate() {
    requestAnimationFrame( animate );
    time = clock.getElapsedTime();

    cube.position.set(Math.sin(time) *10,0,0);
    sLight.angle = options.angle;
    sLight.intensity=options.intensidad;
    sLight.penumbra = options.penumbra;
    sLightH.update();

    if(loaded){
      rayCaster.setFromCamera(mousePosition,camera);
      const objects = rayCaster.intersectObjects(scene.children)

      for (let i = 0; i <objects.length; i++){
        if(objects[i].object.name==="Cubo2"){
          console.log("UwU");
          console.log(cube2.parent);
          scene.attach(cube2);
        }
      }

    }
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

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

