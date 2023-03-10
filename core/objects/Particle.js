import { c } from "../Engine.js";

export default class Particle {
  constructor({
    position,
    radius = 5,
    color = "red",
    velocity = { x: 5, y: 5 },
    alpha = 1,
    alphaUpdate = 0.01,
    gravity = 0.09,
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
    this.alpha -= this.alphaUpdate;

    this.velocity.y += this.gravity;
    this.velocity.y *= this.friction;
    this.velocity.x *= this.friction;
    this.position.x += this.velocity.x * this.extraSpeed;
    this.position.y += this.velocity.y * this.extraSpeed;
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

export function SpawnParticle({
  arrayOfParticles,
  position = { x: innerWidth / 2, y: innerHeight / 2 },
  radius = 5,
  color = `hsl(${Math.random() * 360}, 75%, 50%)`,
  velocity = { x: 0, y: 0 },
  alpha = 1,
  alphaUpdate = 0.05,
  gravity = 0.09,
  friction = 0.99,
  extraSpeed = 1,
}) {
  arrayOfParticles.push(
    new Particle({
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
