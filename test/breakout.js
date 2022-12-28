import Engine from "./core/Engine.js";
import Circle from "./core/objects/Circle.js";
import Square from "./core/objects/Square.js";

const engine = new Engine(1024, 576);

const keys = engine.keys;
engine.UpdateKeys();

const player = new Square({
  position: { x: engine.canvas.width / 2 - 75, y: engine.canvas.height - 50 },
  color: "blue",
  width: 150,
  height: 20,
});

const ball = new Circle({
  position: { x: engine.canvas.width / 2 - 5, y: engine.canvas.height / 2 },
  radius: 10,
  velocity: {
    x: 50,
    y: 50,
  },
});

const map = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

const blocks = [];
const size = 40;
const offsetX = 1;
const offsetY = 1;
const marginX = 200;

map.forEach((row, y) => {
  row.forEach((s, x) => {
    if (s === "-") {
      blocks.push(
        new Square({
          position: {
            x: marginX + x * (offsetX + size) + offsetX,
            y: y * (offsetY + size) + offsetY,
          },

          width: size,
          height: size,
          color: "red",
        })
      );
    }
  });
});

engine.RenderGameObject(ball);
engine.RenderGameObject(player);

engine.AddLoopCode(() => {
  player.Update();
  ball.Update();
  player.position.x = ball.position.x;

  blocks.forEach((b, index) => {
    b.Render();

    if (
      ball.position.y - ball.velocity.y + ball.radius >= b.position.y &&
      ball.position.x + ball.velocity.x + ball.radius >= b.position.x &&
      ball.position.x - ball.velocity.x - ball.radius <=
        b.position.x + b.width &&
      ball.position.y + ball.velocity.y - ball.radius <= b.position.y + b.height
    ) {
      setTimeout(() => {
        blocks.splice(index, 1);
        return;
      }, 0);
    }
  });

  if (keys.a) {
    player.velocity.x = -10;
  } else if (keys.d) {
    player.velocity.x = 10;
  } else player.velocity.x = 0;

  if (
    ball.position.y + ball.radius >= player.position.y &&
    ball.position.x + ball.radius >= player.position.x &&
    ball.position.x - ball.radius <= player.position.x + player.width &&
    ball.position.y - ball.radius <= player.position.y + player.height
  ) {
    ball.velocity.y = -ball.velocity.y;
  }

  //Boundaries of the canvas
  //Right side
  if (ball.position.x + ball.radius >= engine.canvas.width) {
    ball.velocity.x = -ball.velocity.x;
  }

  //Top
  if (ball.position.y - ball.radius <= 0) {
    ball.velocity.y = -ball.velocity.y;
  }

  //Right
  if (ball.position.x - ball.radius <= 0) {
    ball.velocity.x = -ball.velocity.x;
  }

  //Lose condition
  if (ball.position.y + ball.radius >= engine.canvas.height) {
    //Lose callBack
  }
});

engine.color = "white";
engine.Init();
