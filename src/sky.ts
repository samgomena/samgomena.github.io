import * as THREE from "three";

import { rainbow } from "./utils";

// Ignore for now cuz generating types is hard
// @ts-ignore
import skyVert from "./assets/Sky.vert";
// @ts-ignore
import skyFrag from "./assets/Sky.frag";

export default class Sky {
  public group;
  private material;
  constructor() {
    const geom = new THREE.IcosahedronGeometry(50, 4);
    this.group = new THREE.Group();

    this.material = this.getShaderMaterial();

    const mesh = new THREE.Mesh(geom, this.material);
    this.group.add(mesh);

    this.material.uniforms.color.value = new THREE.Color(
      this.generateNewColor()
    );

    // this.material.uniforms.mouse.value.x = window.x;

    document.getElementById("change_me")?.addEventListener("click", () => {
      if (this.material) {
        this.material.uniforms.color.value = new THREE.Color(
          this.generateNewColor()
        );
      }
    });
  }

  getShaderMaterial() {
    const uniforms = {
      time: { type: "f", value: 0 },
      sat: { type: "f", value: 0 },
      color: { type: "c", value: new THREE.Color(0x49beaa) },
      // color: {type: 'c', value: new THREE.Color(0x7F3DBC)}
      // mouse: { type: "v2", value: new THREE.Vector2() },
    };

    // https://threejs.org/docs/#api/en/materials/ShaderMaterial.uniforms
    const shader = new THREE.ShaderMaterial({
      vertexShader: skyVert,
      fragmentShader: skyFrag,
      uniforms,
    });

    shader.side = THREE.BackSide;
    return shader;
  }

  generateNewColor() {
    const numberOfSteps = Math.random();
    const step = Math.random();
    return rainbow(numberOfSteps, step);
  }

  // onWindowResize() {
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  // }

  update() {
    if (this.material) {
      this.material.uniforms.time.value += 0.00005; //performance.now() * 0.000003;
    }
  }
}
