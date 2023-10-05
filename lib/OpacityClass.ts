export class Opacity {
  value: number;
  private t: number;
  constructor() {
    this.t = 1;
    this.value = 0;
  }
  update() {
    if (this.t < 1) {
      this.t += 0.05;
    }
    this.value = 100 * (1 - this.t) * (Math.sin(this.t * 20) * 0.5 + 0.5);
  }
  pulse() {
    this.t = 0;
  }
}
