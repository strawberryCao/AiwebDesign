import './style.css';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion) gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x071018, 0.052);
const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.1, 120);
camera.position.set(0, 0, 12);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.52, 0.75, 0.92));

scene.add(new THREE.AmbientLight(0x79aab7, 0.42));
const key = new THREE.DirectionalLight(0xd9fbff, 4.2);
key.position.set(5, 6, 8);
scene.add(key);
const rim = new THREE.PointLight(0x2d94b0, 30, 30);
rim.position.set(-7, -1, 4);
scene.add(rim);

const world = new THREE.Group();
scene.add(world);
const crystalMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x98dce8,
  roughness: 0.12,
  metalness: 0.05,
  transmission: 0.72,
  thickness: 1.8,
  ior: 1.31,
  transparent: true,
  opacity: 0.78,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  iridescence: 0.28,
  iridescenceIOR: 1.3,
});
const wireMaterial = new THREE.MeshBasicMaterial({ color: 0xc7f7ff, wireframe: true, transparent: true, opacity: 0.1 });

const clusters = [];
const positions = [[0, 0, 0], [-4.4, -10, -4], [4.7, -20, -2], [-1, -31, -5], [0, -42, 0]];
positions.forEach((position, sectionIndex) => {
  const group = new THREE.Group();
  group.position.set(...position);
  const count = sectionIndex === 4 ? 6 : 9;
  for (let i = 0; i < count; i += 1) {
    const geometry = new THREE.IcosahedronGeometry(0.65 + Math.random() * 1.1, sectionIndex === 0 ? 2 : 1);
    const mesh = new THREE.Mesh(geometry, crystalMaterial.clone());
    mesh.material.opacity = 0.48 + Math.random() * 0.34;
    mesh.position.set((Math.random() - 0.5) * 4.8, (Math.random() - 0.5) * 4.6, (Math.random() - 0.5) * 3.6);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    mesh.scale.set(0.45 + Math.random(), 1 + Math.random() * 1.8, 0.45 + Math.random());
    group.add(mesh);
    if (i % 3 === 0) {
      const wire = new THREE.Mesh(geometry, wireMaterial);
      wire.position.copy(mesh.position);
      wire.rotation.copy(mesh.rotation);
      wire.scale.copy(mesh.scale).multiplyScalar(1.025);
      group.add(wire);
    }
  }
  world.add(group);
  clusters.push(group);
});

const particleCount = 2400;
const particleGeometry = new THREE.BufferGeometry();
const particlePositions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i += 1) {
  const radius = 8 + Math.random() * 35;
  const angle = Math.random() * Math.PI * 2;
  particlePositions[i * 3] = Math.cos(angle) * radius * (0.35 + Math.random());
  particlePositions[i * 3 + 1] = -Math.random() * 48 + 4;
  particlePositions[i * 3 + 2] = Math.sin(angle) * radius * 0.35 - 4;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
const particles = new THREE.Points(
  particleGeometry,
  new THREE.PointsMaterial({ color: 0x9defff, size: 0.025, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }),
);
world.add(particles);

const pointer = new THREE.Vector2();
window.addEventListener('pointermove', (event) => {
  pointer.x = (event.clientX / innerWidth - 0.5) * 2;
  pointer.y = (event.clientY / innerHeight - 0.5) * 2;
});

if (!reducedMotion) {
  gsap.from('.hero-title .line>span', { yPercent: 110, duration: 1.4, stagger: 0.11, ease: 'power4.out', delay: 0.2 });
  gsap.from('.reveal', { y: 20, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.75 });

  const panels = gsap.utils.toArray('.panel');
  panels.forEach((panel, index) => {
    gsap.from(panel.querySelectorAll('.eyebrow,h2,.summary,.project-link,.project-data'), {
      scrollTrigger: { trigger: panel, start: 'top 68%' },
      y: 46,
      opacity: 0,
      duration: 1.05,
      stagger: 0.08,
      ease: 'power3.out',
    });
    ScrollTrigger.create({
      trigger: panel,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setScene(index),
      onEnterBack: () => setScene(index),
    });
  });

  gsap.to(camera.position, { y: -42, ease: 'none', scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 1.15 } });
  gsap.to(camera.rotation, { z: -0.18, ease: 'none', scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 1.6 } });
  gsap.to('.progress span', { height: '100%', ease: 'none', scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: true } });
}

function setScene(index) {
  document.querySelector('.scene-label b').textContent = String(index + 1).padStart(2, '0');
  clusters.forEach((cluster, clusterIndex) => {
    gsap.to(cluster.rotation, { y: (clusterIndex - index) * 0.35, x: (index - clusterIndex) * 0.08, duration: 1.6, ease: 'power3.out' });
  });
}

const cursor = document.querySelector('.cursor');
window.addEventListener('pointermove', (event) => gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 0.18, ease: 'power2.out' }));
document.querySelectorAll('.magnetic').forEach((element) => {
  element.addEventListener('mouseenter', () => cursor.classList.add('active'));
  element.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,.4)' });
  });
  element.addEventListener('pointermove', (event) => {
    const bounds = element.getBoundingClientRect();
    gsap.to(element, {
      x: (event.clientX - bounds.left - bounds.width / 2) * 0.18,
      y: (event.clientY - bounds.top - bounds.height / 2) * 0.18,
      duration: 0.25,
    });
  });
});

const clock = new THREE.Clock();
function render() {
  const elapsed = clock.getElapsedTime();
  clusters.forEach((cluster, clusterIndex) => {
    cluster.rotation.y += 0.0007 * (clusterIndex + 1);
    cluster.children.forEach((child, childIndex) => {
      child.rotation.x += 0.00025 * ((childIndex % 3) + 1);
      child.position.y += Math.sin(elapsed * 0.45 + childIndex) * 0.0007;
    });
  });
  particles.rotation.y = elapsed * 0.012;
  camera.position.x += (pointer.x * 0.42 - camera.position.x) * 0.018;
  camera.rotation.x += (-pointer.y * 0.025 - camera.rotation.x) * 0.02;
  rim.position.x = Math.sin(elapsed * 0.28) * 7;
  composer.render();
  requestAnimationFrame(render);
}
render();

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
});
