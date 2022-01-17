import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import * as dat from 'dat.gui'

//LOADING
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/NormalMap.png')

/*const loader = new STLLoader();
loader.load( './models/Gengar.stl', function ( geometry ) {

    const material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
    const mesh = new THREE.Mesh( geometry, material );

    mesh.position.set( 0, - 0.25, 0.6 );
    mesh.rotation.set( 0, - Math.PI / 2, 0 );
    mesh.scale.set( 0.5, 0.5, 0.5 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add( mesh );

} );*/

//DEBUG CONSOLE
const gui = new dat.GUI()

//CANVAS
const canvas = document.querySelector('canvas.webgl')

//SCENE
const scene = new THREE.Scene()

//OBJECTS
const geometry = new THREE.SphereBufferGeometry( .5, 64, 64);

//MATERIALS

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

//MESH
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

//LIGHTS
const defaultLight = new THREE.PointLight(0xffffff, 0.1)
defaultLight.position.set(2,3,4);
scene.add(defaultLight)

const pointLight = new THREE.PointLight(0xff0000, 2)
pointLight.position.set(0.97,-2.93,-0.76);
pointLight.intensity = 10;
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xff00f0, 2)
pointLight2.position.set(0.58,3.83,-1.36);
pointLight2.color.set(0x1071c5);
pointLight2.intensity = 8;
scene.add(pointLight2)

//GUI PANEL CONTROL
//Light1
const folder1 = gui.addFolder("Light 1");
folder1.add(pointLight.position, 'x').min(-10).max(10).step(0.01)
folder1.add(pointLight.position, 'y').min(-10).max(10).step(0.01)
folder1.add(pointLight.position, 'z').min(-10).max(10).step(0.01)
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
folder2.add(pointLight2.position, 'x').min(-10).max(10).step(0.01)
folder2.add(pointLight2.position, 'y').min(-10).max(10).step(0.01)
folder2.add(pointLight2.position, 'z').min(-10).max(10).step(0.01)
folder2.add(pointLight2,'intensity').min(0).max(15).step(1)
const lightColor2 = {
    color : 0xffffff
}
folder2.addColor(lightColor2, 'color')
    .onChange(()=>{
        pointLight2.color.set(lightColor2.color);
    });
//Light helper
//const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
//scene.add(pointLightHelper);

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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha : true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

//document.addEventListener('mouseclick', onDocumentMouseClick)


const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()