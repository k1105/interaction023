import { Keypoint } from "@tensorflow-models/hand-pose-detection";
import { Ball } from "./BallClass";
import { MutableRefObject } from "react";
import p5Types from "p5";
import { Target } from "./TargetClass";

type Props = {
  position: Keypoint;
  size: number;
};

export class Point extends Target {
  private t: number;
  constructor({ position, size }: Props) {
    super(position, size);

    this.t = 0;
    this.state = "alive";
  }

  update(balls: Ball[], score: MutableRefObject<number>) {
    for (const ball of balls) {
      if (
        this.state == "alive" &&
        this.isHit(
          ball.body.position,
          ball.body.bounds.max.x - ball.body.bounds.min.x
        )
      ) {
        // hit
        score.current += 10;
        this.state = "hit";
        this.t = 0;
      }
    }

    if (this.state == "born") {
      this.state = "aborning";
    }
    if (this.state == "hit") {
      // this.state = "dying";
    }
    if (this.t < 1) {
      this.t += 0.05;
    }

    if (this.t >= 1) {
      if (this.state == "dying") {
        this.state = "dead";
      } else {
        this.state = "alive";
      }
    }
  }

  show(p5: p5Types) {
    let scale = 1;
    if (this.t < 1) {
      scale = this.state == "dying" ? 1 - this.t : this.t;
    }

    p5.circle(
      this.position.x,
      this.position.y,
      30 * scale * (Math.sin(Date.now() / 300) * 0.15 + 0.85)
    );
  }
}
