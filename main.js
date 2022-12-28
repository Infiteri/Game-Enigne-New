import Engine from "./core/Engine.js";
import GameObject from "./core/objects/GameObject.js";

const engine = new Engine(1024, 576);

const bg = new GameObject({
  position: { x: 0, y: 0 },
  src: "assets/background.png",
});

const player = new GameObject({
  position: { x: 0, y: 0 },
  scale: 2.75,
  frames: 8,
  frameHold: 10,
  offset: { x: 208, y: 198 },
  width: 105,
  height: 141,
  src: "", //PUT THE SOURCE IN HERE
});
engine.RenderGameObject(player);

engine.RenderGameObject(bg);

engine.RenderGameObject(player);

engine.Init();
