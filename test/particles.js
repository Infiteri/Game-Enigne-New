import Engine, { c } from "../core/Engine.js";
import Mouse from "../core/Mouse.js";
import { SpawnParticle } from "../core/objects/Particle.js";

const engine = new Engine();

//TODAY I will TRY to add Some PARTICLES
const particles = [];
Mouse.Update();

addEventListener("click", () => {
  const count = 500;
  const power = 8;
  const angleIncrement = (Math.PI * 2) / count;

  for (let i = 0; i < count; i++) {
    SpawnParticle({
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
    });
  }
});

engine.AddLoopCode(() => {
  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];

    if (particle.alpha > 0) {
      particle.Render();
      particle.Update();
    } else {
      particles.splice(i, 1);
    }

    //Right
    if (
      particle.position.x + particle.radius + particle.velocity.x - 25 >=
      engine.canvas.width
    ) {
      particles.splice(i, 1);
    }

    //Bottom
    if (particle.position.y + particle.radius >= engine.canvas.height) {
      particles.splice(i, 1);
    }

    //Left
    if (particle.position.x - particle.radius - particle.velocity.x <= 0) {
      particles.splice(i, 1);
    }
  }
});

engine.color = "rgba(0, 0, 0, 0.2)";
engine.Init();
