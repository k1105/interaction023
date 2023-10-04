import { Keypoint } from "@tensorflow-models/hand-pose-detection";
import Matter from "matter-js";
import p5Types from "p5";

export class Ball {
  body: Matter.Body;
  private displaySize: number;
  private t: number;
  private scale: number;
  private currentScale: number;
  private targetScale: number;
  private multiply: number;
  constructor(position: Keypoint, size: number) {
    this.body = Matter.Bodies.circle(position.x, position.y, size);
    this.displaySize = size * 2;
    this.scale = 1;
    this.currentScale = 1;
    this.targetScale = 1;
    this.t = 1;
    this.multiply = 1;
  }

  getMultiply() {
    return this.multiply;
  }

  setMultiply(multiply: number) {
    this.multiply = multiply;
  }

  show(p5: p5Types) {
    if (this.t < 1) {
      this.scale = (1 - this.t) * this.currentScale + this.t * this.targetScale;
    }
    p5.circle(
      this.body.position.x,
      this.body.position.y,
      this.displaySize * this.scale
    );
    this.t += 0.1;
  }

  updateScale(scale: number) {
    this.currentScale = this.scale;
    this.targetScale = scale * this.scale;
    this.t = 0;
  }
}
