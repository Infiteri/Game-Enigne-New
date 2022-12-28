import { c } from "../Engine.js";

export default class Circle {
  constructor({
    position,
    radius = 5,
    color = "red",
    velocity = { x: 0, y: 0 },
    gravity = 1,
    friction = 0.5,
    glowColor = "white",
    glowBlur = 0  ,
  }) {
    {
      this.position = position;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
      this.gravity = gravity;
      this.friction = friction;
      this.glowColor = glowColor;
      this.glowBlur = glowBlur;
    }
  }

  ApplyGravity() {
    this.velocity.y += this.gravity;
  }

  Bounce() {
    this.velocity.y = -this.velocity.y * this.friction;
  }

  Update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  Render() {
    c.save();
    c.beginPath();

    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.shadowColor = this.glowColor;
    c.shadowBlur = this.glowBlur;
    c.fill();

    c.closePath();
    c.restore();
    c.restore();
  }
}
