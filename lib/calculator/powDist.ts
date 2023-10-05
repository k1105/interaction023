import { Keypoint } from "@tensorflow-models/hand-pose-detection";

export const powDist = (p0: Keypoint, p1: Keypoint) => {
  return (p0.x - p1.x) ** 2 + (p0.y - p1.y) ** 2;
};
