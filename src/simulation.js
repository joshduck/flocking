import random from "./util/random";
import Vector from "./util/vector";
import Entity from "./entity";
import {
  createBuffer,
  drawEntities,
  drawTargets,
  drawEntityForces,
  fillBounds
} from "./util/drawing";
import { world as config } from "./config";

export default class Simulation {
  constructor(canvas, config = {}) {
    this.canvas = canvas;
    this.play = true;
    this.config = {
      debug: false,
      ...config
    };

    this.initCanvas();
    this.initEntities();
    this.initEvents();
  }

  setConfig(config) {
    this.config = { ...this.config, ...config };
  }

  initCanvas() {
    this.bounds = new Vector(this.canvas.width, this.canvas.height);
    this.front = this.canvas.getContext("2d");
    this.back = createBuffer(this.canvas);
  }

  initEntities() {
    // Randomness to the flow
    this.homingPosition = this.bounds.clone().multiply(0.5);

    // Avoid touches
    this.touchPosition = this.bounds.clone().multiply(0.5);

    this.targets = [
      {
        strength: 0.004,
        exponent: 1,
        position: this.homingPosition
      },
      {
        strength: -1000,
        exponent: -1.5,
        position: this.touchPosition
      }
    ];

    this.entities = Array(config.ENTITIES);
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i] = new Entity(this.bounds);
    }
  }

  initEvents() {
    this.canvas.addEventListener("mousemove", e => {
      this.touchPosition.x = e.offsetX;
      this.touchPosition.y = e.offsetY;
    });

    setInterval(() => {
      this.homingPosition.x = random(0.25, 0.75) * this.bounds.x;
      this.homingPosition.y = random(0.25, 0.75) * this.bounds.y;
    }, 5000);
  }

  start() {
    this.stop();
    this.schedule();
  }

  schedule() {
    if (this.animationFrame == null) {
      this.animationFrame = requestAnimationFrame(() => {
        this.animationFrame = null;
        this.frame();
        this.schedule();
      });
    }
  }

  stop() {
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
  }

  frame() {
    this.update();
    this.draw();
  }

  update() {
    const { entities, targets } = this;
    for (let i = 0; i < entities.length; i++) {
      entities[i].updatePosition();
    }

    for (let i = 0; i < entities.length; i++) {
      entities[i].updateVelocity(entities, targets);
    }
  }

  draw() {
    const { front, back, entities, targets, bounds } = this;

    fillBounds(back, bounds);
    drawEntities(back, entities);
    front.drawImage(back.canvas, 0, 0);

    if (this.config.debug) {
      drawTargets(front, targets);
      drawEntityForces(front, entities);
    }
  }
}
