import { c } from "../Engine.js";

export default class Circle {
  constructor({
    position,
    radius = 5,
    color = "red",
    velocity = { x: 0, y: 0 },
  }) {
    {
      this.position = position;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
    }
  }

  Update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  Render() {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
    c.closePath();
  }
}
