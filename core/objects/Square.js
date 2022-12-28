import Engine, { c } from "../Engine.js";

export default class Square {
  constructor({
    position,
    width = 50,
    height = 100,
    velocity = { x: 0, y: 0 },
    color = "white",
    gravity = 0.2,
  }) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.color = color;
    this.gravity = gravity;
    this.velocity = velocity;
  }

  Update() {
    const canvas = document.querySelector("canvas");

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += this.gravity;
    } else this.velocity.y = 0;
  }

  Render() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
