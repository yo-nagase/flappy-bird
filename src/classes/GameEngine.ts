import Bird from './Bird';
import Pipe from './Pipe';

class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private bird: Bird;
  private pipes: Pipe[];
  private animationFrameId: number | null = null;
  private lastTime: number = 0;
  private isRunning: boolean = false;
  private score: number = 0;
  private gameOver: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.bird = new Bird(this.canvas.width / 4, this.canvas.height / 2); // Moved bird to 1/4 of canvas width
    this.pipes = [];
    this.drawWaitingScreen();
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.gameOver = false;
      this.score = 0;
      this.bird = new Bird(this.canvas.width / 4, this.canvas.height / 2);
      this.pipes = [new Pipe(this.canvas.width, this.canvas.height)];
      this.lastTime = performance.now();
      this.animate();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  onScreenClick() {
    if (this.isRunning) {
      this.bird.flap();
    }
  }

  private animate(currentTime: number = 0) {
    if (!this.isRunning) return;

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.draw();
    this.animationFrameId = requestAnimationFrame((time) => this.animate(time));
  }

  private update(deltaTime: number) {
    this.bird.update(deltaTime);
    this.pipes.forEach(pipe => pipe.update(deltaTime));
    
    // Add new pipes periodically
    if (this.pipes[this.pipes.length - 1].x < this.canvas.width - 300) { // Increased from 200
      this.pipes.push(new Pipe(this.canvas.width, this.canvas.height));
    }

    // Remove off-screen pipes
    this.pipes = this.pipes.filter(pipe => pipe.x + pipe.width > 0);

    // Increase score when passing a pipe
    this.pipes.forEach(pipe => {
      if (pipe.x + pipe.width < this.bird.x && !pipe.passed) {
        this.score++;
        pipe.passed = true;
      }
    });

    // Check collisions
    if (this.checkCollisions()) {
      this.gameOver = true;
      this.stop();
    }
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bird.draw(this.ctx);
    this.pipes.forEach(pipe => pipe.draw(this.ctx));

    // Draw score
    this.ctx.fillStyle = 'black';
    this.ctx.font = '24px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Score: ${this.score}`, 10, 30);

    if (this.gameOver) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = 'white';
      this.ctx.font = '48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(`Game Over`, this.canvas.width / 2, this.canvas.height / 2 - 50);
      this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 50);
    }
  }

  private checkCollisions(): boolean {
    return this.pipes.some(pipe => pipe.collidesWith(this.bird));
  }

  private drawWaitingScreen() {
    this.ctx.fillStyle = 'black';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Click "Start Game" to begin', this.canvas.width / 2, this.canvas.height / 2);
  }

  getScore(): number {
    return this.score;
  }

  isGameOver(): boolean {
    return this.gameOver;
  }
}

export default GameEngine;