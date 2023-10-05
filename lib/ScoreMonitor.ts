import p5Types from "p5";

type Props = {
  score: number;
  bestScore: number;
  p5: p5Types;
};

const scoreBox = (
  x: number,
  y: number,
  width: number,
  height: number,
  score: number,
  label: string,
  p5: p5Types
) => {
  p5.push();
  p5.translate(0, y);
  p5.line(0, height / 2, x, height / 2);
  p5.push();
  p5.push();
  p5.textAlign(p5.LEFT);
  p5.textSize(20);
  p5.noStroke();
  p5.fill(255);
  p5.text(label, 10, height * 0.4);
  p5.pop();
  p5.translate(x, 0);
  p5.push();
  p5.fill(1, 25, 96);
  p5.rect(0, 0, width, height);
  p5.noStroke();
  p5.fill(255);
  p5.text(String(score), width / 2, height * 0.65);
  p5.pop();
  p5.pop();
  p5.pop();
};

export const ScoreMonitor = ({ score, bestScore, p5 }: Props) => {
  p5.push();
  p5.textAlign(p5.CENTER);
  p5.textSize(30);
  p5.stroke(220);
  p5.noFill();
  p5.strokeWeight(3);
  const squareHeight = 60;
  const squareWidth = 160;

  const currentScorePosition = ((score / bestScore) * p5.width) / 3;
  const bestScorePosition = p5.width / 3;
  scoreBox(
    currentScorePosition,
    0,
    squareWidth,
    squareHeight,
    score,
    "score",
    p5
  );

  p5.translate(0, squareHeight * 1.5);
  scoreBox(
    bestScorePosition,
    0,
    squareWidth,
    squareHeight,
    bestScore,
    "best score",
    p5
  );
  p5.pop();
};
