import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // 导入GLTF模型加载器
import * as THREE from 'three'; // 导入Three.js库

// 设置模型
function setupModel(data) {
  const model = data.scene.children[0]; // 获取模型
  const clip = data.animations[0]; // 获取动画片段
  const mixer = new THREE.AnimationMixer(model); // 创建动画混合器
  const action = mixer.clipAction(clip); // 创建动画操作
  action.play(); // 播放动画
  model.tick = (delta) => mixer.update(delta); // 定义更新函数
  return model; // 返回模型
}

// 创建GLTF加载器
const loader = new GLTFLoader();

// 并行加载多个模型
const [parrotData, FlamingoData, StorkData] = await Promise.all([
  loader.loadAsync('src/assets/Parrot.glb'), // 加载鹦鹉模型数据
  loader.loadAsync('src/assets/Flamingo.glb'), // 加载火烈鸟模型数据
  loader.loadAsync('src/assets/Stork.glb'), // 加载鹳模型数据
]);

// 设置鹦鹉模型
const parrot = setupModel(parrotData);
parrot.position.set(100, 30, 30); // 设置鹦鹉模型位置

// 设置火烈鸟模型
const Flamingo = setupModel(FlamingoData);

// 设置鹳模型
const stork = setupModel(StorkData);
stork.position.set(-150, 20, -30); // 设置鹳模型位置

// 导出模型数组
export default [parrot, Flamingo, stork];
