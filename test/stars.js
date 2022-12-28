import Engine, { c } from "../core/Engine.js";
import Circle from "../core/objects/Circle.js";
import Particle from "../core/objects/Particle.js";
import { RandomNumFromRange } from "../core/utils/utils.js";

const engine = new Engine();

const stars = [];
const miniStars = [];
const bgStars = [];
let ticker = 0;
let spawnRate = 75;

const backgroundGradient = c.createLinearGradient(
  0,
  0,
  0,
  engine.canvas.height
);

backgroundGradient.addColorStop(0, "#171e26");
backgroundGradient.addColorStop(1, "#3f586b");

//Fill Stars array
for (let i = 0; i < 1; i++) {
  stars.push(
    new Circle({
      position: { x: 500, y: 50 },
      color: "white",
      radius: 10,
      velocity: {
        x: 0,
        y: 5,
      },

      glowColor: "#E3EAEF",
      glowBlur: 50,
    })
  );
}

for (let i = 0; i < 150; i++) {
  const x = Math.random() * engine.canvas.width;
  const y = Math.random() * engine.canvas.height;
  const radius = RandomNumFromRange(0, 3);

  bgStars.push(
    new Circle({
      position: { x, y },
      radius,
      color: "white",
      glowColor: "white",
      glowBlur: 5,
    })
  );
}

//Render the stars
engine.AddLoopCode(() => {
  stars.forEach(star => {
    star.shatter = () => {
      star.radius -= 1;

      for (let i = 0; i < 25; i++) {
        let x = RandomNumFromRange(-7, 7);
        let y = RandomNumFromRange(-10, 10);

        miniStars.push(
          new Particle({
            position: { x: star.position.x, y: star.position.y },
            color: "white",
            radius: 2,
            velocity: {
              x,
              y,
            },

            gravity: 0.1,
            alphaUpdate: 0.05,
          })
        );
      }
    };
  });

  c.fillStyle = backgroundGradient;
  c.fillRect(0, 0, engine.canvas.width, engine.canvas.height);

  bgStars.forEach(star => {
    star.Render();
  });

  CreateMountain(1, engine.canvas.height - 50, "#384551");
  CreateMountain(2, engine.canvas.height - 100, "#2B3843");
  CreateMountain(3, engine.canvas.height - 300, "#26333E");

  stars.forEach((star, index) => {
    star.Update();
    star.Render();

    if (
      star.position.x - star.radius < 0 ||
      star.position.x + star.radius > engine.canvas.width
    ) {
      star.velocity.x = -star.velocity.x;
    }

    if (
      star.position.y + star.radius + star.velocity.y >=
      engine.canvas.height
    ) {
      star.Bounce();
      star.shatter();
    } else star.ApplyGravity();

    if (star.radius <= 0) {
      stars.splice(index, 1);
    }
  });

  miniStars.forEach((p, index) => {
    p.Render();
    p.Update();

    if (p.alpha <= 0) miniStars.splice(index, 1);

    if (p.position.y + p.radius + p.velocity.y >= engine.canvas.height) {
      p.velocity.y = -p.velocity.y * p.friction;
    } else {
      p.velocity.y += p.gravity;
    }
  });

  ticker++;

  if (ticker % spawnRate === 0) {
    const x = RandomNumFromRange(0, engine.canvas.width);
    spawnRate = RandomNumFromRange(75, 150);
    const radius = RandomNumFromRange(5, 20);

    const newStar = new Circle({
      position: { x, y: -100 },
      color: "white",
      radius: radius,
      velocity: {
        x: RandomNumFromRange(-20, 20),
        y: 5,
      },

      friction: 0.5,
      glowColor: "#E3EAEF",
      glowBlur: 50,
    });

    stars.push(newStar);
  }
});

function CreateMountain(amount, height, color) {
  for (let i = 0; i < amount; i++) {
    c.save();
    c.beginPath();
    const width = engine.canvas.width / amount;
    const randomStuff = 150;

    c.moveTo(i * width, engine.canvas.height);
    c.lineTo(i * width + width + randomStuff, engine.canvas.height);
    c.lineTo(i * width + width / 2, engine.canvas.height - height);
    c.lineTo(i * width - randomStuff, engine.canvas.height);
    c.fillStyle = color;
    c.fill();

    c.closePath();
    c.restore();
  }
}

engine.color = "rgba(0,0,0,0.5)";
engine.Init();
