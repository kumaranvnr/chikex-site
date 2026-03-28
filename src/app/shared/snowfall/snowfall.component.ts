import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snowfall',
  template: `
    <canvas #canvas></canvas>
    <audio #audio controls loop>
      <source src="https://friedchicken.blob.core.windows.net/general/Jingle-Bells(chosic.com).mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  `,
  styleUrls: ['./snowfall.component.scss']
})
export class SnowfallComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('audio', { static: true }) audioRef!: ElementRef<HTMLAudioElement>;
  private ctx!: CanvasRenderingContext2D;
  private snowflakes: Snowflake[] = [];
  private animationFrameId!: number;

  ngOnInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.resizeCanvas();
    this.createSnowflakes();
    this.animate();
    //  this.playMusic(); // Start playing music
    window.addEventListener('resize', this.resizeCanvas.bind(this));
  }

  ngOnDestroy(): void {
    window.cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
    this.stopMusic(); // Stop music when component is destroyed
  }

  private resizeCanvas(): void {
    this.canvasRef.nativeElement.width = window.innerWidth;
    this.canvasRef.nativeElement.height = window.innerHeight;
  }

  private createSnowflakes(): void {
    const numberOfSnowflakes = 100;
    for (let i = 0; i < numberOfSnowflakes; i++) {
      this.snowflakes.push(new Snowflake(this.ctx));
    }
  }

  private animate(): void {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    this.snowflakes.forEach(snowflake => snowflake.update());
    this.animationFrameId = window.requestAnimationFrame(this.animate.bind(this));
  }

  private playMusic(): void {
    this.audioRef.nativeElement.play().catch(error => {
      console.error("Error playing audio:", error);
    });
  }

  private stopMusic(): void {
    this.audioRef.nativeElement.pause();
    this.audioRef.nativeElement.currentTime = 0; // Reset to the beginning
  }
}

class Snowflake {
  private x: number;
  private y: number;
  private radius: number;
  private speed: number;
  private opacity: number;
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.x = Math.random() * ctx.canvas.width;
    this.y = Math.random() * ctx.canvas.height;
    this.radius = Math.random() * 4 + 1; // Radius between 1 and 5
    this.speed = Math.random() * 1 + 0.5; // Speed between 0.5 and 1.5
    this.opacity = Math.random() * 0.5 + 0.5; // Opacity between 0.5 and 1
  }

  update(): void {
    this.y += this.speed;
    if (this.y > this.ctx.canvas.height) {
      this.y = -this.radius; // Reset to the top
      this.x = Math.random() * this.ctx.canvas.width; // Random x position
    }
    this.draw();
  }

  private draw(): void {
    this.ctx.save();
    this.ctx.fillStyle = `rgba(177, 210, 219, ${this.opacity})`;
    this.ctx.translate(this.x, this.y);
    this.ctx.beginPath();
    this.ctx.moveTo(0, -this.radius);
    for (let i = 0; i < 5; i++) {
      this.ctx.rotate((Math.PI * 2) / 5);
      this.ctx.lineTo(0, -this.radius * 0.5);
      this.ctx.rotate((Math.PI * 2) / 5);
      this.ctx.lineTo(0, -this.radius);
    }
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  }
}