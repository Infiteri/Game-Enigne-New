import { c } from "../Engine.js";

export default class GameObject {
  constructor({
    position,
    width = 100,
    height = 100,
    offset = { x: 0, y: 0 },
    src,
    scale = 1,
    frameHold = 3,
    frames = 1,
    sprites = {},
    currentYFrame = 0,
  }) {
    //!: Yes
    this.position = position;
    this.width = width;
    this.height = height;
    this.offset = offset;
    this.scale = scale;
    this.frameHold = frameHold;
    this.frames = frames;
    this.elapsedFrames = 0;
    this.sprites = sprites;
    this.currentYFrame = currentYFrame;

    this.velocity = {
      x: 0,
      y: 1,
    };

    //Movement
    this.gravity = 0.5;
    this.friction = 0.2;
    this.jumpForce = -12;
    this.speed = 7;

    this.keys = {
      a: false,
      d: false,
      w: false,
    };

    this.currentFrame = 0;

    this.onGround = false;

    //*: Image setup
    this.image = new Image();
    this.image.src = src;

    this.image.onload = () => {
      this.imageWidth = this.image.width;
      this.imageHeight = this.image.height;
    };

    for (const sprite in this.sprites) {
      this.sprites[sprite].image = new Image();
      this.sprites[sprite].image.src = this.sprites[sprite].src;
    }
  }

  //Movement code
  Movement() {
    this.HorizontalMovement();
    this.KeyUpdate();
    this.VerticalMovement();
  }

  KeyUpdate() {
    addEventListener("keydown", ({ code }) => {
      if (code === "KeyA") this.keys.a = true;
      else if (code === "KeyD") this.keys.d = true;

      if (code === "KeyW") this.keys.w = true;
    });

    addEventListener("keyup", ({ code }) => {
      if (code === "KeyA") this.keys.a = false;
      else if (code === "KeyD") this.keys.d = false;

      if (code === "KeyW") this.keys.w = false;
    });
  }

  HorizontalMovement() {
    if (this.keys.a) this.velocity.x = -this.speed;
    else if (this.keys.d) this.velocity.x = this.speed;
    else this.velocity.x *= this.friction;
  }

  VerticalMovement() {
    addEventListener("keydown", ({ code }) => {
      if (code === "KeyW" && this.onGround) this.velocity.y = this.jumpForce;
    });
  }

  //Update code
  UpdateAnimation() {
    this.elapsedFrames++;

    if (this.elapsedFrames % this.frameHold === 0) {
      if (this.currentFrame < this.frames - 1) this.currentFrame++;
      else this.currentFrame = 0;
    }
  }

  PlayAnimation(key) {
    this.image = this.sprites[key].image;
    this.frames = this.sprites[key].frames;

    this.image.onload = () => {
      this.imageWidth = this.sprites[key].image.width;
      this.imageHeight = this.sprites[key].image.height;
    };

    console.log(this.imageWidth / this.frames + "   " + key);

    return;
  }

  Update() {
    const canvas = document.querySelector("canvas");

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.ApplyGravity();
      this.onGround = false;
    } else {
      this.velocity.y = 0;
      this.onGround = true;
    }

    this.Movement();
  }

  //Render code
  Render() {
    this.UpdateAnimation();

    c.drawImage(
      this.image,
      this.currentFrame * (this.imageWidth / this.frames),
      this.currentYFrame * (this.imageHeight / this.frames),
      this.imageWidth / this.frames,
      this.imageHeight,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.imageWidth / this.frames) * this.scale,
      this.imageHeight * this.scale
    );
  }

  RenderHitbox() {
    c.fillStyle = "rgba(255, 0, 0, 0.2)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  //Extra code
  ApplyGravity() {
    this.velocity.y += this.gravity;
  }

  AddFloor(hitbox) {
    if (this.position.y + this.height + this.velocity.y >= hitbox.position.y) {
      this.velocity.y = 0;
      this.onGround = true;
    } else this.onGround = false;
  }
}
