import convert from "color-convert";
import random from "./util/random";
import { makeWorld } from "./world";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const world = makeWorld();

const moveNodes = entities => {
  for (let i = 0; i < entities.length; i++) {
    entities[i].updatePosition();
  }
};

const drawFill = () => {
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(0, 0, world.bounds.x, world.bounds.y);
};

const drawNodes = entities => {
  for (let i = 0; i < entities.length; i++) {
    const { position, velocity, attraction, correlation, target } = entities[i];

    // ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
    // ctx.beginPath();
    // ctx.moveTo(position.x, position.y);
    // ctx.lineTo(position.x + target.x, position.y + target.y);
    // ctx.stroke();

    // ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    // ctx.beginPath();
    // ctx.moveTo(position.x, position.y);
    // ctx.lineTo(position.x + attraction.x, position.y + attraction.y);
    // ctx.stroke();

    // ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
    // ctx.beginPath();
    // ctx.moveTo(position.x, position.y);
    // ctx.lineTo(position.x + correlation.x, position.y + correlation.y);
    // ctx.stroke();

    ctx.strokeStyle =
      "#" + convert.hsl.hex((entities[i].speed * 512) % 255, 100, 50);
    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(position.x - velocity.x, position.y - velocity.y);
    ctx.stroke();
  }
};

const drawTargets = targets => {
  for (let i = 0; i < targets.length; i++) {
    ctx.fillStyle = "#000";
    ctx.fillRect(targets[i].position.x - 2, targets[i].position.y - 2, 4, 4);
  }
};

const attractNodes = (entities, targets) => {
  for (let i = 0; i < entities.length; i++) {
    entities[i].updateVelocity(entities, targets);
  }
};

console.log(world);
const step = () => {
  const { entities, targets } = world;
  attractNodes(entities, targets);
  moveNodes(entities);
  drawFill();
  drawTargets(targets);
  drawNodes(entities);
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
