import random from "./util/random";
import {
  drawEntities,
  drawTargets,
  drawEntityForces,
  fillBounds
} from "./util/drawing";
import { makeWorld } from "./world";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const world = makeWorld();

const moveNodes = entities => {
  for (let i = 0; i < entities.length; i++) {
    entities[i].updatePosition();
  }
};

const attractNodes = (entities, targets) => {
  for (let i = 0; i < entities.length; i++) {
    entities[i].updateVelocity(entities, targets);
  }
};

const step = () => {
  const { entities, targets, bounds } = world;
  attractNodes(entities, targets);
  moveNodes(entities);
  fillBounds(ctx, bounds);
  drawTargets(ctx, targets);
  drawEntities(ctx, entities);
  //drawEntityForces(ctx, entities);
  requestAnimationFrame(step);
};

window.onmousemove = e => {
  world.touchPoint.position.x = e.offsetX;
  world.touchPoint.position.y = e.offsetY;
  //console.log(e);
};

step();
setInterval(() => {
  world.homingBeacon.position.x = random(0.25, 0.75) * world.bounds.x;
  world.homingBeacon.position.y = random(0.25, 0.75) * world.bounds.y;
  //  run = !run;
  //  step();
}, 5000);
