import Engine, { c } from "../../core/Engine.js";
import Particle from "../../core/objects/Particle.js";

const engine = new Engine(700, 600);

const particles = [];
const spawn = document.querySelector("#spawn");
const color = document.querySelector("#color");
const countDom = document.querySelector("#count");
const alphaDom = document.querySelector("#alpha");
const alphaUpdateDom = document.querySelector("#alphaUpdate");
const radiusDom = document.querySelector("#radius");
const gravityDom = document.querySelector("#gravity");
const frictionDom = document.querySelector("#friction");

spawn.onclick = () => {
  ParticleStuff();
};

engine.canvas.addEventListener("click", ({ clientX, clientY }) => {
  ParticleStuff(clientX, clientY);
});

engine.AddLoopCode(() => {
  particles.forEach((p, index) => {
    p.Render();
    p.Update();

    if (p.alpha < 0) particles.splice(index, 1);

    //Right
    if (p.position.x + p.radius + p.velocity.x - 25 >= engine.canvas.width) {
      particles.splice(index, 1);
    }

    //Bottom
    if (p.position.y + p.radius >= engine.canvas.height) {
      particles.splice(index, 1);
    }

    //Left
    if (p.position.x - p.radius - p.velocity.x <= 0) {
      particles.splice(index, 1);
    }
  });
});

function ParticleStuff(
  x = engine.canvas.width / 2,
  y = engine.canvas.height / 2
) {
  const count = countDom.value;
  for (let i = 0; i < count; i++) {
    const power = 8;
    const angleIncrement = (Math.PI * 2) / count;

    const p = new Particle({
      position: { x, y },

      velocity: {
        x: Math.cos(angleIncrement * i) * Math.random() * power,
        y: Math.sin(angleIncrement * i) * Math.random() * power,
      },

      alpha: alphaDom.value,
      alphaUpdate: alphaUpdateDom.value,

      color: color.value || `hsl(${Math.random() * 360}, 75%, 50%)`,
      radius: radiusDom.value,
    });

    particles.push(p);
  }
}

engine.color = "black";
engine.Init();
