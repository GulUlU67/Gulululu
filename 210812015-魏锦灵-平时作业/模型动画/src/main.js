import * as THREE from 'three'; // 导入Three.js库
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // 导入轨道控制器
import Stats from 'three/addons/libs/stats.module.js'; // 导入性能监视器
import { Clock } from 'three'; // 导入时钟模块
import bird from './demo/bird.js'; // 导入鸟模型

// 声明变量
let camera, scene, renderer, stats;
const clock = new Clock(); // 创建时钟对象

// 初始化函数
function init() {
  // 创建场景
  scene = new THREE.Scene();
  
  // 将鸟模型添加到场景中
  scene.add(...bird);  
  
  // 创建相机
  camera = new THREE.PerspectiveCamera(
    90, // 视野角度
    window.innerWidth / window.innerHeight, // 长宽比
    0.1, // 近截面（near）
    1000 // 远截面（far）
  );

  // 设置相机位置
  camera.position.set(80, 0, 300);

  // 创建环境光
  const ambientLight = new THREE.HemisphereLight(
    'white', // 天空颜色
    'darkslategrey', // 地面颜色
    5, // 光的强度
  );

  // 设置场景背景颜色
  scene.background = new THREE.Color('skyblue');
  
  // 创建主光源
  const mainLight = new THREE.DirectionalLight('white', 4);
  mainLight.position.set(10, 10, 10);
  
  // 将光源添加到场景中
  scene.add(ambientLight, mainLight);

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true }); // 启用抗锯齿
  renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比
  renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染器大小

  // 将渲染结果添加到页面中
  document.body.appendChild(renderer.domElement);

  // 监听窗口大小变化事件
  window.addEventListener('resize', onWindowResize);
  window.onresize = onWindowResize;

  // 初始化辅助工具
  initHelper();
}

// 动画函数
function animate() {
  // 使用渲染循环，使动画流畅
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera); // 渲染场景
    const delta = clock.getDelta(); // 获取时间间隔
    console.log(delta); // 打印时间间隔
    bird.forEach(bird => bird.tick(delta)); // 更新鸟模型
    stats.update(); // 更新性能监视器
  });
}

// 窗口大小变化事件处理函数
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight); // 调整渲染器大小
  camera.aspect = window.innerWidth / window.innerHeight; // 调整相机长宽比
  
  camera.updateProjectionMatrix(); // 更新相机投影矩阵
}

// 初始化辅助工具
function initHelper() {
  const axesHelper = new THREE.AxesHelper(50); // 创建坐标轴辅助线
  scene.add(axesHelper); // 将坐标轴辅助线添加到场景中

  const controls = new OrbitControls(camera, renderer.domElement); // 创建轨道控制器
  controls.addEventListener('change', () => {
    renderer.render(scene, camera); // 控制器变化时重新渲染场景
  });

  stats = new Stats(); // 创建性能监视器
  
  document.body.appendChild(stats.domElement); // 将性能监视器元素添加到页面中
}

// 初始化场景
init();

// 开始动画
animate();
