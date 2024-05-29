// demo1 RoatingCube
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // 导入OrbitControls

console.log(THREE);

// 建立场景
const scene = new THREE.Scene();
// 创建BoxGeometry（立方体）对象
const geometry = new THREE.BoxGeometry(1, 1, 1);

console.log(geometry);
// 给一个材质，让它有颜色
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  opacity: 0.5,
  transparent: true,
});

// 创建球体的几何体
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
// 创建球体的材质
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// 创建球体网格
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Mesh（网格）。 网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = 2 * i;
    cube.position.z = 2 * j;
    scene.add(cube);

    // 添加球体到每个立方体的位置
    const sphere = sphereMesh.clone(); // 使用clone方法克隆一个球体
    sphere.position.copy(cube.position); // 设置球体的位置和立方体相同
    scene.add(sphere); // 将球体添加到场景中
  }
}

// 创建相机 使用的是 PerspectiveCamera（透视摄像机）
const camera = new THREE.PerspectiveCamera(
  15, // 视野角度（FOV）
  window.innerWidth / window.innerHeight, // 长宽比（aspect ratio）
  0.1, // 近截面（near）
  1000 // 远截面（far）
);
// 设置相机摆放的位置
camera.position.set(100, 100, 100);
// 设置相机看向的位置
camera.lookAt(0, 0, 0);

// WebGLRenderer 渲染器
const renderer = new THREE.WebGLRenderer();
// 渲染器的尺寸
renderer.setSize(window.innerWidth, window.innerHeight);

//  renderer（渲染器）的dom元素（renderer.domElement）添加到 HTML 文档中
renderer.render(scene, camera);
document.body.appendChild(renderer.domElement);

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // 立方体旋转
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  // 或 cube.rotateY(0.01)
}
// animate();

window.onresize = () => {
  console.log(window.innerHeight, window.innerWidth);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

// 辅助坐标轴
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
controls.addEventListener('change', function () {
  renderer.render(scene, camera); //执行渲染操作
}); //监听鼠标、键盘事件
