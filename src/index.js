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

const step = ({ front, back }, world) => {
  const { entities, targets, bounds } = world;

  // Movement
  updateEntities(entities, targets);

  // Drawing
  fillBounds(back, bounds);
  drawEntities(back, entities);
  front.drawImage(back.canvas, 0, 0);

  drawTargets(front, targets);
  drawEntityForces(front, entities);

  requestAnimationFrame(() => step({ front, back }, world));
};

const createBuffer = canvas => {
  const buffer = document.createElement("canvas");
  buffer.height = canvas.height;
  buffer.width = canvas.width;
  return buffer.getContext("2d");
};

const initialize = canvas => {
  const front = canvas.getContext("2d");
  const back = createBuffer(canvas);
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
  step({ front, back }, world);
};

var canvas = document.getElementById("canvas");
initialize(canvas);
