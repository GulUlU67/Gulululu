import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 3;
camera.position.z = 10;

// 创建立体纹理 左右上下前后
const cubeTexture = new THREE.CubeTextureLoader().setPath('/textures/').load([
    'dongxi.jpg', 'dongxi.jpg',
  'dongxi.jpg', 'sand.jpg',
  'dongxi.jpg', 'dongxi.jpg'
]);
// 添加背景纹理
scene.background = cubeTexture;

// 创建一个球体
const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshBasicMaterial({ 
  envMap: cubeTexture
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 3, 0);
scene.add(sphere);

// 添加网格地面
// const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// 将渲染器添加到页面
document.getElementById("container").appendChild(renderer.domElement);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 动画函数
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

// 调整窗口大小时更新相机和渲染器
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 开始动画
animate();
