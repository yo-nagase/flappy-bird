class Bird {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number = 0;
  gravity: number = 0.3; // Reduced from 0.6
  flapStrength: number = -6; // Reduced from -10

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y - 100; // Moved the bird 100 pixels higher
    this.width = 40;
    this.height = 30;
  }

  update(deltaTime: number) {
    this.velocity += this.gravity;
    this.y += this.velocity * (deltaTime / 16);

    // Prevent the bird from going off the top of the screen
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  flap() {
    this.velocity = this.flapStrength;
  }
}

export default Bird;