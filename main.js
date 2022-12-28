import Engine from "./core/Engine.js";
import Mouse from "./core/Mouse.js";
import { SpawnParticle } from "./core/objects/Particle.js";

const engine = new Engine();

const particles = [];
const count = 75;
const radius = 100;
Mouse.MoveUpdate();

engine.AddLoopCode(() => {
  particles.forEach((p, i) => {
    if (p.alpha > 0) {
      p.Render();
      p.Update();
    } else {
      particles.splice(i, 1);
    }

    //Right
    if (p.position.x + p.radius + p.velocity.x - 100 >= engine.canvas.width) {
      particles.splice(i, 1);
    }

    //Bottom
    if (p.position.y + p.radius >= engine.canvas.height) {
      particles.splice(i, 1);
    }

    //Top
    if (p.position.y - p.radius + 20 <= -25) {
      particles.splice(i, 1);
    }

    //Left
    if (p.position.x - p.radius - p.velocity.x <= -25) {
      particles.splice(i, 1);
    }
  });
});

let hue = 0;
let hueRadians = 0;
function GenerateRing() {
  setTimeout(GenerateRing, 150);

  for (let i = 0; i < count; i++) {
    const radian = (Math.PI * 2) / count;

    const x = Mouse.x + Math.cos(radian * i) * radius;
    const y = Mouse.y + Math.sin(radian * i) * radius;

    SpawnParticle({
      arrayOfParticles: particles,
      radius: 5,
      color: `hsl(${Math.abs(hue * 360)}, 70%, 70%)`,
      position: {
        x,
        y,
      },

      velocity: {
        x: Math.cos(radian * i) * 5,
        y: Math.sin(radian * i) * 5,
      },
      gravity: 0,
      alpha: 1,
      friction: 1,
      alphaUpdate: 0.005,
    });
  }

  hueRadians += 0.1;
  hue = Math.sin(hueRadians);
}

GenerateRing();

engine.color = "rgba(0, 0, 0, 0.2)";
engine.Init();
