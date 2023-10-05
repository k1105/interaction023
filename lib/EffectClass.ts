import { Keypoint } from "@tensorflow-models/hand-pose-detection";
import p5Types from "p5";

export class Effect {
  position: Keypoint;
  private t: number;
  state: "none" | "dead";
  constructor(position: Keypoint) {
    this.position = position;
    this.t = 0;
    this.state = "none";
  }
  update() {
    if (this.state == "none") {
      this.t += 10;
      if (this.t / 3 > 255) {
        this.state = "dead";
      }
    }
  }

  show(p5: p5Types) {
    p5.push();
    p5.noFill();
    p5.stroke(255, 255 - this.t / 3);
    p5.strokeWeight(1);
    p5.circle(this.position.x, this.position.y, this.t);
    p5.pop();
  }
}
