# Flocking

A simulation of boids.

```javascript
import Flocking from "@joshduck/flocking";

const canvas = document.getElementById("canvas");
const simulation = new Flocking(canvas);
simulation.start();
```

## Methods

* `constructor(canvas: HTMLCanvasElement)`
* `start()`
* `stop()`
* `frame()` Render a single frame.
* `setConfig({ debug: true })`

## Preview

![Screenshot](../../static/screen.png)
