import { c } from "../Engine.js";

export default class PhysicsParticle {
  constructor({
    position,
    radius = 5,
    color = "red",
    velocity = { x: 5, y: 5 },
    alpha = 1,
    alphaUpdate = 0.01,
    gravity = 1,
    friction = 0.99,
    extraSpeed = 1,
  }) {
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;

    this.gravity = gravity;
    this.friction = friction;
    this.extraSpeed = extraSpeed;

    //Fading
    this.alpha = alpha;
    this.alphaUpdate = alphaUpdate;
  }

  Update() {
    const canvas = document.querySelector("canvas");

    this.alpha -= this.alphaUpdate;

    this.velocity.y *= this.friction;
    this.velocity.x *= this.friction;

    this.position.x += this.velocity.x * this.extraSpeed;
    this.position.y += this.velocity.y * this.extraSpeed;
    this.velocity.y += this.gravity;

    //Bottom | Top
    if (
      this.position.y + this.radius + this.velocity.y >= canvas.height ||
      this.position.y - this.radius - this.velocity.y <= 0
    ) {
      this.velocity.y = Math.random() * -this.velocity.y;
    }

    //Left | Right
    if (
      this.position.x - this.radius <= 0 ||
      this.position.x + this.radius >= canvas.width
    ) {
      this.velocity.x = Math.random() * -this.velocity.x;
    }
  }

  Render() {
    c.save();

    c.beginPath();
    c.fillStyle = this.color;
    c.globalAlpha = this.alpha;
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    c.fill();

    c.closePath();
    c.restore();
  }
}

export function SpawnPhysicsParticle({
  arrayOfParticles,
  position = { x: innerWidth / 2, y: innerHeight / 2 },
  radius = 5,
  color = `hsl(${Math.random() * 360}, 75%, 50%)`,
  velocity = { x: 0, y: 0 },
  alpha = 1,
  alphaUpdate = 0.05,
  gravity = 0.2,
  friction = 0.99,
  extraSpeed = 1,
}) {
  arrayOfParticles.push(
    new PhysicsParticle({
      position,
      color,
      radius,
      alpha,
      velocity,
      alphaUpdate,
      gravity,
      friction,
      extraSpeed,
    })
  );
}
