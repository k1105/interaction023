import { Ball } from "./BallClass";
import p5Types from "p5";
import { Target } from "./TargetClass";

export class Event extends Target {
  private expireAt: number;
  private expired: boolean;
  type: string;
  constructor(type: string, size: number) {
    super({ x: -size, y: 100 }, size);
    this.expireAt = 0;
    this.type = type;
    this.expired = false;
  }

  isExpired() {
    return this.state == "dead" && this.expired;
  }

  update(ball: Ball) {
    if (
      this.state == "alive" &&
      this.isHit(
        ball.body.position,
        ball.body.bounds.max.x - ball.body.bounds.min.x
      ) &&
      ball.getMultiply() == 1
    ) {
      this.state = "hit";
      this.expireAt = Date.now() + 10000;
    }

    if (this.expireAt > 0 && Date.now() > this.expireAt) {
      this.expired = true;
    }

    if (this.state == "alive") {
      this.position.x += 0.5;
      if (this.position.x > window.innerWidth + this.size) {
        //画面外にイベントがはみ出したときに死滅する
        this.state = "dead";
        this.expired = true;
      }
    }
  }

  show(p5: p5Types) {
    if (this.state == "alive") {
      p5.push();
      p5.noFill();
      p5.stroke(255);
      p5.strokeWeight(1);
      p5.circle(this.position.x, this.position.y, this.size);
      p5.textAlign(p5.CENTER);
      p5.textSize(10);
      p5.fill(255);
      p5.noStroke();
      p5.text(
        this.type,
        this.position.x,
        this.position.y + (p5.textAscent() - p5.textDescent()) / 2
      );
      p5.pop();
    }
  }
}
