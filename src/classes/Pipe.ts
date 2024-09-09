class Pipe {
  x: number;
  topHeight: number;
  bottomHeight: number;
  width: number;
  gap: number;
  speed: number;
  color: string;
  borderColor: string;
  canvasHeight: number;
  passed: boolean = false;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.width = 80;
    this.x = canvasWidth;
    this.gap = 200;
    this.speed = 3;
    this.color = '#4CAF50';
    this.borderColor = '#45a049';
    this.canvasHeight = canvasHeight;

    const availableHeight = canvasHeight - this.gap;
    this.topHeight = Math.random() * (availableHeight - 100) + 50;
    this.bottomHeight = availableHeight - this.topHeight;
  }

  update(deltaTime: number) {
    this.x -= this.speed * (deltaTime / 16);
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Draw top pipe
    this.drawPipePart(ctx, 0, this.topHeight, false);

    // Draw bottom pipe
    const bottomY = ctx.canvas.height - this.bottomHeight;
    this.drawPipePart(ctx, bottomY, this.bottomHeight, true);
  }

  private drawPipePart(ctx: CanvasRenderingContext2D, y: number, height: number, isBottom: boolean) {
    const gradient = ctx.createLinearGradient(this.x, y, this.x + this.width, y + height);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, '#45a049');

    ctx.fillStyle = gradient;
    ctx.fillRect(this.x, y, this.width, height);

    // Draw border
    ctx.strokeStyle = this.borderColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, y, this.width, height);

    // Draw pipe end
    const endHeight = 20;
    const endWidth = this.width + 20;
    const endX = this.x - 10;
    const endY = isBottom ? y : y - endHeight;

    ctx.fillStyle = this.color;
    ctx.fillRect(endX, endY, endWidth, endHeight);
    ctx.strokeRect(endX, endY, endWidth, endHeight);
  }

  collidesWith(bird: { x: number; y: number; width: number; height: number }): boolean {
    return (
      bird.x < this.x + this.width &&
      bird.x + bird.width > this.x &&
      (bird.y < this.topHeight || bird.y + bird.height > this.canvasHeight - this.bottomHeight)
    );
  }
}

export default Pipe;