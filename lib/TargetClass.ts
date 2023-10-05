import { Keypoint } from "@tensorflow-models/hand-pose-detection";
import { powDist } from "./calculator/powDist";

export class Target {
  state: "born" | "aborning" | "alive" | "hit" | "dying" | "dead";
  position: Keypoint;
  size: number;
  constructor(position: Keypoint, size: number) {
    this.position = position;
    this.size = size;
    this.state = "born";
  }

  isHit(position: Keypoint, size: number) {
    return powDist(position, this.position) < ((this.size + size) / 2) ** 2;
  }
}
