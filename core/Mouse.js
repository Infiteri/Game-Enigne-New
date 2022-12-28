export default class Mouse {
  static x = 400;
  static y = 400;

  static mouse = {
    x: this.x,
    y: this.y,
  };

  static Update() {
    addEventListener("click", ({ clientX, clientY }) => {
      this.x = clientX;
      this.y = clientY;

      this.mouse.x = this.x;
      this.mouse.y = this.y;
    });
  }
}
