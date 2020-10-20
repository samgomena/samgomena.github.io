"use strict";

class Sky {
  constructor() {
    this.group = new THREE.Group();

    Utils.loadShader("Sky").then((obj) => {
      let geom = new THREE.IcosahedronGeometry(100, 4);
      this.mat = this.getShader(obj.vs, obj.fs);
      let mesh = new THREE.Mesh(geom, this.mat);
      this.group.add(mesh);

      let n1 = Math.random(100) + 1;
      let n2 = Math.random(100) + 1;
      // Generate a random color on page load
      // this.mat.uniforms.color.value = new THREE.Color(this.generateNewColor());
      this.mat.uniforms.color.value = new THREE.Color(this.rainbow(n1, n2));
    });

    // Bind `generateNewColor` to `Sky` class instead of clicked element
    // document.getElementById("change_me")
    //     .addEventListener("click", this.generateNewColor.bind(this));
    document.getElementById("change_me").addEventListener("click", () => {
      if (this.mat) {
        let n1 = Math.random(100) + 1;
        let n2 = Math.random(100) + 1;
        this.mat.uniforms.color.value = new THREE.Color(this.rainbow(n1, n2));
      }
    });
  }

  getShader(vs, fs) {
    let uniforms = {
      time: { type: "f", value: 0 },
      sat: { type: "f", value: 0 },
      color: { type: "c", value: new THREE.Color(0x49beaa) },
      // color: {type: 'c', value: new THREE.Color(0x7F3DBC)}
    };

    // https://threejs.org/docs/#api/en/materials/ShaderMaterial.uniforms
    let shader = new THREE.ShaderMaterial({
      vertexShader: vs,
      fragmentShader: fs,
      uniforms,
    });

    shader.side = THREE.BackSide;

    return shader;
  }

  // See: https://stackoverflow.com/questions/1484506/random-color-generator
  rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    let r, g, b;
    let h = step / numOfSteps;
    let i = ~~(h * 6);
    let f = h * 6 - i;
    let q = 1 - f;
    switch (i % 6) {
      case 0:
        r = 1;
        g = f;
        b = 0;
        break;
      case 1:
        r = q;
        g = 1;
        b = 0;
        break;
      case 2:
        r = 0;
        g = 1;
        b = f;
        break;
      case 3:
        r = 0;
        g = q;
        b = 1;
        break;
      case 4:
        r = f;
        g = 0;
        b = 1;
        break;
      case 5:
        r = 1;
        g = 0;
        b = q;
        break;
    }
    let c =
      "#" +
      ("00" + (~~(r * 255)).toString(16)).slice(-2) +
      ("00" + (~~(g * 255)).toString(16)).slice(-2) +
      ("00" + (~~(b * 255)).toString(16)).slice(-2);
    return c;
  }

  generateNewColor() {
    let r = Utils.get_random_between(0, 256);
    let g = Utils.get_random_between(0, 256);
    let b = Utils.get_random_between(0, 256);

    // Update three material color
    let color = `rgb(${r}, ${g}, ${b})`;
    return color;
    // this.mat.uniforms.color.value = new THREE.Color(this.color);
  }

  update() {
    if (this.mat) {
      this.mat.uniforms.time.value = performance.now() * 0.00001;
      // let oldColor = this.mat.uniforms.color.value;
      // Use this to convert to RGB and then enumerate the colors https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
      // Also looks useful https://htmlcolorcodes.com/
      // this.mat.uniforms.color.value = new THREE.Color()
    }
  }
}
