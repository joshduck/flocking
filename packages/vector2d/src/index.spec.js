const Vector = require("./");

it("should create instances", () => {
  const vector = new Vector(1, 2);
  expect(vector.x).toBe(1);
  expect(vector.y).toBe(2);
});

it("mutates the properties", () => {
  const vector = new Vector(1, 2);
  vector.subtract(new Vector(1, 2));
  expect(vector.x).toBe(0);
  expect(vector.y).toBe(0);
});

it("multiplies correctly", () => {
  const vector = new Vector(1, 2);
  vector.multiply(2);
  expect(vector.x).toBe(2);
  expect(vector.y).toBe(4);

  vector.multiply(-0.5);
  expect(vector.x).toBe(-1);
  expect(vector.y).toBe(-2);
});

it("normalizes values", () => {
  const vector = new Vector(1, 1);
  vector.normalize();
  expect(vector.length()).toBeCloseTo(1);
  expect(vector.x).toBeCloseTo(Math.sqrt(1 / 2));
  expect(vector.y).toBeCloseTo(Math.sqrt(1 / 2));

  vector.normalize(3);
  expect(vector.length()).toBeCloseTo(3);
  expect(vector.x).toBeCloseTo(Math.sqrt(9 / 2));
  expect(vector.y).toBeCloseTo(Math.sqrt(9 / 2));
});
