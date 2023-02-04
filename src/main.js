import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import sun_texture from "./images/sun.png";
import mercury_texture from "./images/mercury.jpg";
import venus_texture from "./images/venus.jpg";
import earth_texture from "./images/earth.jpg";
import mars_texture from "./images/mars.jpg";
import jupiter_texture from "./images/jupiter.jpg";
import uranus_texture from "./images/uranus.jpg";
import neptune_texture from "./images/neptune.jpg";
import saturn_texture from "./images/saturn.jpg";
import saturn_ring_texture from "./images/saturn_ring.png";

// Create renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Create Textute Loader
const texture_loader = new THREE.TextureLoader();

// Create scene
const scene = new THREE.Scene();

// Create perspective camera
const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  1000
);

// Control camera with mouse
const orbit = new OrbitControls(camera, renderer.domElement);

// Set the camera position
camera.position.set(-80, 100, 160);
orbit.update(); // important: is has to be just after the new position of the camera

// Add axes helper to show the axes through the scene.
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// Add lights
const am_light = new THREE.AmbientLight(0xffffff, 0);
scene.add(am_light);

const point_light = new THREE.PointLight(0xffffff, 2, 300);
scene.add(point_light);

// Add the sun
const sun_geo = new THREE.SphereGeometry(16, 50, 50);
const sun_mat = new THREE.MeshBasicMaterial({
  map: texture_loader.load(sun_texture),
});
const Sun = new THREE.Mesh(sun_geo, sun_mat);
scene.add(Sun);

const createPlanet = (size, texture, pos, ring) => {
  // Add mercury
  const geo = new THREE.SphereGeometry(size, 50, 50);
  const mat = new THREE.MeshStandardMaterial({
    map: texture_loader.load(texture),
  });
  const planet = new THREE.Mesh(geo, mat);
  const planet_obj = new THREE.Object3D();
  planet_obj.add(planet);

  if (ring) {
    const ring_geo = new THREE.RingGeometry(ring.inner, ring.outer, 50);
    const ring_mat = new THREE.MeshBasicMaterial({
      map: texture_loader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const ring_mesh = new THREE.Mesh(ring_geo, ring_mat);
    planet.add(ring_mesh);
    ring_mesh.rotation.x = -0.5 * Math.PI;
  }

  scene.add(planet_obj);
  planet.position.x = pos;

  return { mesh: planet, obj: planet_obj };
};

// Add Mercury
const Mercury = createPlanet(3.2, mercury_texture, 28);
// Add Venus
const Venus = createPlanet(5.8, venus_texture, 44);
// Add Earth
const Earth = createPlanet(6, earth_texture, 62);
// Add Mars
const Mars = createPlanet(4, mars_texture, 78);
// Add Jupiter
const Jupiter = createPlanet(12, jupiter_texture, 100);
// Add saturn
const Saturn = createPlanet(10, saturn_texture, 138, {
  inner: 12,
  outer: 20,
  texture: saturn_texture,
});
// Add Mercury
const Uranus = createPlanet(7, uranus_texture, 176);
// Add Neptune
const Neptune = createPlanet(7, neptune_texture, 200);

// Add saturn ring

// change bg color
let skybox = new THREE.CubeTextureLoader().load([
  "/px.jpg",
  "/nx.jpg",
  "/py.jpg",
  "/ny.jpg",
  "/pz.jpg",
  "/nx.jpg",
]);
scene.background = skybox;

const animate = () => {
  Sun.rotateY(0.004);

  Mercury.obj.rotateY(0.04);
  Venus.obj.rotateY(0.015);
  Earth.obj.rotateY(0.01);
  Mars.obj.rotateY(0.008);
  Jupiter.obj.rotateY(0.002);
  Saturn.obj.rotateY(0.009);
  Uranus.obj.rotateY(0.004);
  Neptune.obj.rotateY(0.001);

  Mercury.mesh.rotateY(0.004);
  Venus.mesh.rotateY(0.002);
  Earth.mesh.rotateY(0.002);
  Mars.mesh.rotateY(0.018);
  Jupiter.mesh.rotateY(0.04);
  Saturn.mesh.rotateY(0.038);
  Uranus.mesh.rotateY(0.03);
  Neptune.mesh.rotateY(0.032);

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
