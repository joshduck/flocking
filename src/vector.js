export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  subtract(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  add(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  multiply(scale) {
    this.x *= scale;
    this.y *= scale;
    return this;
  }

  normalize(scale = 1) {
    const norm = this.length();
    if (norm !== 0) {
      this.multiply(scale / norm);
    }
    return this;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
