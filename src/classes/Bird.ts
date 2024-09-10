class Bird {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number = 0;
  gravity: number = 0.3;
  flapStrength: number = -6;
  rotation: number = 0;
  flapAnimation: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 30;
    this.velocity = 0;
  }

  update(deltaTime: number) {
    this.velocity += this.gravity;
    this.y += this.velocity * (deltaTime / 16);

    // Prevent the bird from going off the top of the screen
    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

    // Update rotation based on velocity
    this.rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, (this.velocity * 0.1)));

    // Update flap animation
    this.flapAnimation += 0.1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);

    // Draw body
    ctx.fillStyle = '#FFD700'; // Golden yellow
    ctx.beginPath();
    ctx.ellipse(0, 0, this.width / 2, this.height / 2, 0, 0, 2 * Math.PI);
    ctx.fill();

    // Draw wing
    ctx.fillStyle = '#FFA500'; // Orange
    ctx.beginPath();
    ctx.moveTo(-5, 0);
    ctx.lineTo(-20, Math.sin(this.flapAnimation) * 10);
    ctx.lineTo(-5, 10);
    ctx.closePath();
    ctx.fill();

    // Draw eye
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(10, -5, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(12, -5, 2, 0, 2 * Math.PI);
    ctx.fill();

    // Draw beak
    ctx.fillStyle = '#FF6347'; // Tomato red
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(25, -5);
    ctx.lineTo(25, 5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  flap() {
    this.velocity = this.flapStrength;
  }

  setFlapStrength(strength: number) {
    this.flapStrength = strength;
  }
}

export default Bird;