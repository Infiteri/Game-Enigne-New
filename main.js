import Engine from "./core/Engine.js";
import Mouse from "./core/Mouse.js";
import { SpawnParticle } from "./core/objects/Particle.js";
import { SpawnPhysicsParticle } from "./core/objects/PhysicsParticle.js";

const engine = new Engine();

const particles = [];
Mouse.Update();

addEventListener("click", () => {
  const count = 200;
  const power = 5;
  const angleIncrement = (Math.PI * 2) / count;

  for (let i = 0; i < count; i++) {
    SpawnPhysicsParticle({
      arrayOfParticles: particles,
      velocity: {
        x: Math.cos(angleIncrement * i) * Math.random() * power,
        y: Math.sin(angleIncrement * i) * Math.random() * power,
      },
      position: {
        x: Mouse.x,
        y: Mouse.y,
      },

      alphaUpdate: 0.01,
      extraSpeed: 5,
    });
  }
});

engine.AddLoopCode(() => {
  particles.forEach((p, i) => {
    p.Render();
    p.Update();

    if (p.alpha <= 0) particles.splice(i, 1);
  });
});

engine.color = "black";
engine.Init();
