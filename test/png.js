import Engine from "../core/Engine.js";
import Square from "../core/objects/Square.js";

const engine = new Engine();

//Score elements
const player1Dom = document.querySelector("#player1");
const player2Dom = document.querySelector("#player2");

let player1Score = 0;
let player2Score = 0;

const speed = 10;

const startGame = document.querySelector("button");
startGame.onclick = () => {
  engine.canvas.style.display = "block";
  startGame.remove();
};

const player1 = new Square({
  position: {
    x: 50,
    y: engine.canvas.height / 2 - 50,
  },

  width: 25,
  height: 100,
});

const player2 = new Square({
  position: {
    x: engine.canvas.width - 100,
    y: engine.canvas.height / 2 - 50,
  },

  width: 25,
  height: 100,
});

const ball = new Square({
  position: {
    x: engine.canvas.width / 2 - 5,
    y: engine.canvas.height / 2 - 5,
  },

  velocity: { x: speed, y: speed },

  width: 12,
  height: 12,
});

engine.RenderGameObject(player1);
engine.RenderGameObject(player2);
engine.RenderGameObject(ball);

addEventListener("keydown", event => {
  switch (event.code) {
    case "KeyW":
      player1.velocity.y = -speed - 5;
      break;

    case "KeyS":
      player1.velocity.y = speed + 5;
      break;

    case "ArrowUp":
      player2.velocity.y = -speed - 5;
      break;

    case "ArrowDown":
      player2.velocity.y = speed + 5;
      break;
  }
});

engine.AddLoopCode(() => {
  player1.Update();
  player2.Update();
  ball.Update();

  RestrictPlayer(player1);
  RestrictPlayer(player2);
  BallBounds();

  //Ball to paddle
  //Right paddle
  if (
    ball.position.x + ball.velocity.x + ball.width >=
      player2.position.x + player2.velocity.x &&
    ball.position.y + ball.velocity.y + ball.height >=
      player2.position.y + player2.velocity.y &&
    ball.position.y + ball.velocity.y <= player2.position.y + player2.height
  ) {
    ball.velocity.x = -ball.velocity.x;
    player2Score++;
  }

  //Left paddle
  if (
    ball.position.x + ball.velocity.x <= player1.position.x + player1.width &&
    ball.position.y + ball.velocity.y + ball.height >= player1.position.y &&
    ball.position.y + ball.velocity.y <= player1.position.y + player1.height
  ) {
    ball.velocity.x = -ball.velocity.x;
    player1Score++;
  }

  player1Dom.innerText = player1Score;
  player2Dom.innerText = player2Score;
});

function RestrictPlayer(player) {
  if (player.position.y < 0) {
    player.velocity.y = 0;
    player.position.y = 0;
  } else if (player.position.y + player.height > engine.canvas.height) {
    player.velocity.y = 0;
    player.position.y = engine.canvas.height - player.height;
  }
}

function BallBounds() {
  if (
    ball.position.x + ball.velocity.x + ball.width >= engine.canvas.width ||
    ball.position.x < 0
  ) {
    window.location.reload();
  }

  if (ball.position.y + ball.velocity.y + ball.height >= engine.canvas.height) {
    ball.velocity.y = -ball.velocity.y;
  }

  if (ball.position.y < 0) {
    ball.velocity.y = -ball.velocity.y;
  }
}

engine.color = "black";
engine.Init();
