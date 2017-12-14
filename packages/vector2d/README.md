# Vector2d

A simple, zero-dependency, mutable 2d vector class.

```javascript
const v = new Vector(10, 10);
v.subtract(new Vector(1, 1)); // Vector(9, 9)
v.normalize();
v.length(); // 1
v.multiply(-1);
```

## Properties

* `x`
* `y`

## Methods

* `clone()`
  Create a new instance with same coordinates.
* `reset()`
  Reset coordinates to 0, 0.
* `subtract(other)`
  Subtract vector.
* `add(other)`
  Add vector.
* `multiply(scale)`
  Multiply by a constant length.
* `normalize(scale = 1)`
  Normalize to length provided.
* `length()`
  Length as numeric value.
