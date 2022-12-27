//Class for stuff like static sprites

import { c } from "../Engine.js";

/**
 * @class Sprite : static images rendering (no animation)
 * @todo : Add animation if i feel its worth it
 */
export default class Sprite {
  constructor({ position = { x: 0, y: 0 }, src }) {
    this.position = position;

    this.image = new Image();
    this.image.src = src;
  }

  Render() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
