import { c } from "../Engine.js";

export default class Square {
  constructor({
    position,
    width = 50,
    height = 100,
    velocity = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.width = width;
    this.height = height;

    this.velocity = velocity;
  }

  Update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  Render() {
    c.fillStyle = "white";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
