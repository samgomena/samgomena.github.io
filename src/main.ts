import "normalize.css";
import "../styles/styles.css";

import * as THREE from "three";
import Sky from "./sky";

function supportsWebGL() {
  try {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) {
      return false;
    }
    return (
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (_) {
    return false;
  }
}

function loadWebGLBackground() {
  console.log("wtaf");
  const container = document.getElementById("container");

  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerHeight / window.innerWidth,
    0.1,
    10000
  );

  camera.position.z = 10;

  document.body.insertBefore(renderer.domElement, container);
  container?.setAttribute("style", "z-index: 1");

  const view = new Sky();
  scene.add(view.group);

  const resize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  };

  const render = () => {
    view.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  window.onresize = resize;
  resize();
  requestAnimationFrame(render);
}

(() => loadWebGLBackground())();
// supportsWebGL()
//   ? loadWebGLBackground()
//   : console.log("Sorry m8 this browser doesn't support WebGL"))();
