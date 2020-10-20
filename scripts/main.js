const change_me = document.getElementById("change_me");

function webgl_support() {
  // See https://stackoverflow.com/questions/11871077/proper-way-to-detect-webgl-support
  try {
    var canvas = document.createElement("canvas");
    return (
      !!window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

function load_web_gl() {
  class Main {
    constructor() {
      this.initThree();
      this.resize();
      requestAnimationFrame(this.render.bind(this));
    }

    initThree() {
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer();
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      );
      this.camera.position.z = 10;

      let container = document.getElementById("container");
      document.body.insertBefore(this.renderer.domElement, container);
      container.setAttribute("style", "z-index: 1;");
      // document.body.appendChild(this.renderer.domElement);
      window.onresize = () => this.resize();

      let _this = this;

      let view = new Sky();
      this.scene.add(view.group);
      this.view = view;
    }

    resize() {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    render() {
      this.view.update && this.view.update();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.render.bind(this));
    }
  }

  window.onload = () => new Main();
}

function load_gradient(gradient_data) {
  let gradient_table = JSON.parse(gradient_data);

  change_me.addEventListener("click", () => {
    paint_gradient(gradient_table);
  });

  paint_gradient(gradient_table);
}

function paint_gradient(gradient_table) {
  let rando = Utils.get_random_between(
    0,
    Object.keys(gradient_table).length - 1
  );

  // `use_again` limits bad gradients from being shown
  while (!gradient_table[rando].use_again) {
    rando = Utils.get_random_between(0, 377);
  }

  const gradient_el = document.getElementById("gradient");

  const gradient_entry = gradient_table[rando];
  const name = gradient_entry["name"];
  const grad = gradient_entry["gradient"];

  // Gross but works ¯\_(ツ)_/¯
  let linear_gradient;
  if (grad.length === 8) {
    linear_gradient = `linear-gradient(${grad[1]}, ${grad[2]} ${grad[3]}, ${grad[4]} ${grad[5]}, ${grad[6]} ${grad[7]})`;
  } else {
    linear_gradient = `linear-gradient(${grad[1]}, ${grad[2]} ${grad[3]}, ${grad[4]} ${grad[5]})`;
  }

  let background_gradient = `background-color: ${grad[0]};
                                background-image: ${linear_gradient};`;
  gradient_el.setAttribute("style", background_gradient);
  change_me.setAttribute("title", "This theme's called " + name + "!");
}

function load_non_web_gl() {
  // Taken directly from the three.js docs
  var manager = new THREE.LoadingManager();
  let loader = new THREE.FileLoader(manager);

  //load a text file and output the result to the console
  loader.load(
    "../assets/gradients_min.json",

    // Load and paint gradients from `assets/gradients.json`
    load_gradient,

    // Nop for progress callback for now
    () => {},
    // onError callback
    function (err) {
      console.error(
        `There was an error loading the background gradient's\n${err}`
      );
    }
  );
}

(function () {
  if (webgl_support()) {
    console.log("This browser supports WebGL");
    load_web_gl();
  } else {
    console.log("This browser does not support WebGL");
    load_non_web_gl();
  }
})();
