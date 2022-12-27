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

    this.gameObjects.forEach(obj => {
      obj.Render();
    });
    this.extraLoopCode();

    requestAnimationFrame(this.Loop.bind(this));
  }

  Init() {
    this.Loop();
  }
}
