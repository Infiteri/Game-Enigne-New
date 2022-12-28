/**
 * Main engine class
 */

export const c = document.querySelector("canvas").getContext("2d");

export default class Engine {
  constructor(width = innerWidth, height = innerHeight) {
    this.canvas = document.querySelector("canvas");
    this.canvas.width = width;
    this.canvas.height = height;

    this.gameObjects = [];
    this.extraLoopCode = () => {};

    this.keys = {
      w: false,
      a: false,
      s: false,
      d: false,
    };

    this.color = "#fff";
  }

  AddLoopCode(code) {
    this.extraLoopCode = code;
  }

  RenderGameObject(object) {
    this.gameObjects.push(object);
  }

  Loop() {
    c.fillStyle = this.color;
    c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.gameObjects.length; i++) {
      const obj = this.gameObjects[i];
      if (obj.type === "GameObject") {
        if (obj.isLoaded) obj.Render();
      } else {
        obj.Render();
      }
    }

    this.extraLoopCode();

    requestAnimationFrame(this.Loop.bind(this));
  }

  GetObject(id) {
    for (let i = 0; i < this.gameObjects.length; i++) {
      if (this.gameObjects[i].id === id) {
        return this.gameObjects[i];
      }
    }
  }

  UpdateKeys() {
    addEventListener("keydown", ({ code }) => {
      switch (code) {
        case "KeyA":
          this.keys.a = true;
          break;

        case "KeyD":
          this.keys.d = true;
          break;

        case "KeyW":
          this.keys.w = true;
          break;

        case "KeyS":
          this.keys.s = true;
          break;
      }
    });

    addEventListener("keyup", ({ code }) => {
      switch (code) {
        case "KeyA":
          this.keys.a = false;
          break;

        case "KeyD":
          this.keys.d = false;
          break;

        case "KeyW":
          this.keys.w = false;
          break;

        case "KeyS":
          this.keys.s = false;
          break;
      }
    });
  }

  Init() {
    this.Loop();
  }
}
