import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // 设置场景背景为黑色

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 创建粒子系统
const particles = 500;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particles * 3);

for (let i = 0; i < positions.length; i += 3) {
  // 生成随机位置
  positions[i] = (Math.random() * 2 - 1) * 500;
  positions[i + 1] = (Math.random() * 2 - 1) * 500;
  positions[i + 2] = (Math.random() * 2 - 1) * 500;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// 加载自定义粒子纹理
const textureLoader = new THREE.TextureLoader();
textureLoader.load(
  '/textures/jiuwo.png', // 替换为你自定义的图片路径
  (texture) => {
    // 图片加载成功后的回调函数
    const material = new THREE.PointsMaterial({
      size: 10,
      map: texture,
      transparent: true,
      opacity: 1.0, // 确保透明度为100%
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      alphaTest: 0.5, // 确保透明区域被正确处理
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 动画函数
    function animate() {
      requestAnimationFrame(animate);

      // 旋转粒子系统
      particleSystem.rotation.y += 0.002;

      controls.update();
      renderer.render(scene, camera);
    }

    // 开始动画
    animate();
  },
  undefined,
  (err) => {
    console.error('图片加载失败', err);
  }
);

// 调整窗口大小时更新相机和渲染器
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
