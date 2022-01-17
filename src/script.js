import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import * as dat from 'dat.gui'
import { ArrowHelper } from 'three'

//LOADING
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/NormalMap.png')
let mesh_id = 0;

const loader = new STLLoader();
loader.load( './models/LogoEseo.stl', function ( geometry ) {

    const material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x111111, shininess: 200 } );
    material.normalMap = normalTexture
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 0, 4, 0);
    mesh.rotation.set( 0, 3.2, 0 );
    mesh.scale.set( 0.025, 0.025, 0.025);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh_id = mesh.id;
    //GUI
    const folder3 = gui.addFolder("EseoLogo");
    folder3.add(mesh.position,'x').min(-10).max(10).step(0.1);
    folder3.add(mesh.position,'y').min(-10).max(10).step(0.1);
    folder3.add(mesh.position,'z').min(-10).max(10).step(0.1);
    folder3.add(mesh.rotation,'x').min(-10).max(10).step(0.1);
    folder3.add(mesh.rotation,'y').min(-10).max(10).step(0.1);
    folder3.add(mesh.rotation,'z').min(-10).max(10).step(0.1);
    scene.add( mesh );

} );

//DEBUG CONSOLE
const gui = new dat.GUI()

//CANVAS
const canvas = document.querySelector('canvas.webgl')

//SCENE
const scene = new THREE.Scene()

//LIGHTS
const defaultLight = new THREE.PointLight(0xffffff, 0.1)
defaultLight.position.set(-5.45,0.70,0);
defaultLight.intensity = 0;
scene.add(defaultLight)

const pointLight = new THREE.PointLight(0xff0000, 2)
pointLight.position.set(4,4,-8);
pointLight.intensity = 1;
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff00f0, 2)
pointLight2.position.set(-4.45,4,-15);
pointLight2.color.set(0x1071c5);
pointLight2.intensity = 3;
scene.add(pointLight2)

//Light helpers
const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
scene.add(pointLightHelper);
const pointLightHelper2 = new THREE.PointLightHelper(pointLight, 1);
scene.add(pointLightHelper2);
//const pointLightHelper3 = new THREE.PointLightHelper(defaultLight, 1);
//scene.add(pointLightHelper3);

//RECTANGLES
//RectAreaLightUniformsLib.init();

const rectLight1 = new THREE.RectAreaLight( 0xff0000, 1, 4, 10 );
rectLight1.position.set( - 5, 5, 5 );
scene.add( rectLight1 );

const rectLight2 = new THREE.RectAreaLight( 0xffffff, 1, 4, 10 );
rectLight2.position.set( 0, 5, 5 );
scene.add( rectLight2 );

const rectLight3 = new THREE.RectAreaLight( 0x0000ff, 1, 4, 10 );
rectLight3.position.set( 5, 5, 5 );
scene.add( rectLight3 );

scene.add( new RectAreaLightHelper(rectLight1));
scene.add( new RectAreaLightHelper(rectLight2));
scene.add( new RectAreaLightHelper(rectLight3));

//FLOOR
const geoFloor = new THREE.BoxGeometry( 20, 0.1, 20);
const matStdFloor = new THREE.MeshStandardMaterial( { color: 0x808080, roughness: 0.1, metalness: 0 } );
const mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
mshStdFloor.position.y = -0.5;
scene.add( mshStdFloor );

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
camera.position.set( 0, 5, -12);
camera.rotation.set(1,0,0);
//camera.lookAt(0,6,0);
scene.add(camera)



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//--------------------GUI PANEL CONTROL-----------------------
//DefaultLight
const folder0 = gui.addFolder("Default Light");
folder0.add(defaultLight.position, 'x').min(-15).max(15).step(0.01)
folder0.add(defaultLight.position, 'y').min(-15).max(15).step(0.01)
folder0.add(defaultLight.position, 'z').min(-15).max(15).step(0.01)
folder0.add(defaultLight,'intensity').min(0).max(15).step(1)

//Light1
const folder1 = gui.addFolder("Light 1");
folder1.add(pointLight.position, 'x').min(-15).max(15).step(0.01)
folder1.add(pointLight.position, 'y').min(-15).max(15).step(0.01)
folder1.add(pointLight.position, 'z').min(-15).max(15).step(0.01)
folder1.add(pointLight,'intensity').min(0).max(15).step(1)
const lightColor = {
    color : 0xffffff
}
folder1.addColor(lightColor, 'color')
    .onChange(()=>{
        pointLight.color.set(lightColor.color);
    });
//Light2
const folder2 = gui.addFolder("Light 2");
folder2.add(pointLight2.position, 'x').min(-15).max(15).step(0.01)
folder2.add(pointLight2.position, 'y').min(-15).max(15).step(0.01)
folder2.add(pointLight2.position, 'z').min(-15).max(15).step(0.01)
folder2.add(pointLight2,'intensity').min(0).max(15).step(1)
const lightColor2 = {
    color : 0xffffff
}
folder2.addColor(lightColor2, 'color')
    .onChange(()=>{
        pointLight2.color.set(lightColor2.color);
    });

//Camera position
const folder4 = gui.addFolder("Camera")
folder4.add(camera.position, 'x').min(-20).max(20).step(0.01)
folder4.add(camera.position, 'y').min(-20).max(20).step(0.01)
folder4.add(camera.position, 'z').min(-20).max(20).step(0.01)
folder4.add(camera.rotation, 'x').min(-20).max(20).step(0.001)
folder4.add(camera.rotation, 'y').min(-20).max(20).step(0.001)
folder4.add(camera.rotation, 'z').min(-20).max(20).step(0.001)
//const helper = new THREE.CameraHelper(camera);
//scene.add( helper );

//Rectangles folder
const folder5 = gui.addFolder("Red Rect");
folder5.add(rectLight1.position, 'x').min(-20).max(20).step(0.01);
folder5.add(rectLight1.position, 'y').min(-20).max(20).step(0.01);
folder5.add(rectLight1.position, 'z').min(-20).max(20).step(0.01);
folder5.add(rectLight1.rotation, 'x').min(-20).max(20).step(0.01)
folder5.add(rectLight1.rotation, 'y').min(-20).max(20).step(0.01)
folder5.add(rectLight1.rotation, 'z').min(-20).max(20).step(0.01)

//Arrow helpers
/*const dir = new THREE.Vector3(0,0,1);
dir.normalize();
const origin = new THREE.Vector3();
const length = 1.40;
const hex = 0xffff00;
const arrowHelper = new ArrowHelper(dir,origin,length,hex);
scene.add(arrowHelper);*/

//Axis
//const axesHelper = new THREE.AxesHelper( 5 );
//scene.add( axesHelper );

/**
 * Animate
 */
 const clock = new THREE.Clock()

 const tick = () =>
 {
    const elapsedTime = clock.getElapsedTime()
    // Update objects
    try {
        scene.getObjectById(mesh_id, true).rotation.y+=0.01;
    } catch (error) {};
    // Update Orbital Controls
    controls.update()
 
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
 }
 
 tick()