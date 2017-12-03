import random from "./util/random";
import {
  drawEntities,
  drawTargets,
  drawEntityForces,
  fillBounds
} from "./util/drawing";
import { makeWorld } from "./world";

const updateEntities = (entities, targets) => {
  for (let i = 0; i < entities.length; i++) {
    entities[i].updatePosition();
  }

  for (let i = 0; i < entities.length; i++) {
    entities[i].updateVelocity(entities, targets);
  }
};

const step = (ctx, world) => {
  const { entities, targets, bounds } = world;

  // Movement
  updateEntities(entities, targets);

  // Drawing
  fillBounds(ctx, bounds);
  drawTargets(ctx, targets);
  drawEntities(ctx, entities);
  //drawEntityForces(ctx, entities);

  requestAnimationFrame(() => step(ctx, world));
};

const initialize = canvas => {
  const ctx = canvas.getContext("2d");
  const world = makeWorld();

  // Avoid touches
  canvas.addEventListener("mousemove", e => {
    world.touchPoint.position.x = e.offsetX;
    world.touchPoint.position.y = e.offsetY;
  });

  // Randomness to the flow
  setInterval(() => {
    world.homingBeacon.position.x = random(0.25, 0.75) * world.bounds.x;
    world.homingBeacon.position.y = random(0.25, 0.75) * world.bounds.y;
  }, 5000);

  // Go, go, go!
  step(ctx, world);
};

var canvas = document.getElementById("canvas");
initialize(canvas);
