# Flocking

A simulation of boids.

![Screenshot](static/screen.png)

```
import Simulation from "@joshduck/flocking";

const canvas = document.getElementById("canvas");
const simulation = new Simulation(canvas);

simulation.start();
simulation.stop();
simulation.frame();
simulation.setConfig({ debug: debug });
```
