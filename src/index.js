import convert from "color-convert";
import Vector from "./vector";
import { updateVelocity, makeEntity } from "./entity";
import random from "./util/random";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const WORLD = new Vector(1000, 500);

const CENTERING = {
  strength: 0.004,
  exponent: 1,
  position: WORLD.clone().multiply(0.5)
};

const MOUSE = {
  strength: -1000,
  exponent: -1.5,
  position: WORLD.clone().multiply(0.5)
};

const makeNodes = count => {
  const entities = Array(count);
  for (let i = 0; i < entities.length; i++) {
    entities[i] = makeEntity(WORLD);
  }
  return entities;
};

const moveNodes = entities => {
  for (let i = 0; i < entities.length; i++) {
    const { position, velocity } = entities[i];
    position.add(velocity);
  }
};

const drawFill = () => {
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(0, 0, WORLD.x, WORLD.y);
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
    updateVelocity(entities[i], entities, targets);
  }
};

const entities = makeNodes(100);
const step = () => {
  const targets = [CENTERING, MOUSE];
  attractNodes(entities, targets);
  moveNodes(entities);
  drawFill();
  drawTargets(targets);
  drawNodes(entities);
  requestAnimationFrame(step);
};

window.onmousemove = e => {
  MOUSE.position.x = e.offsetX;
  MOUSE.position.y = e.offsetY;
  //console.log(e);
};

step();
setInterval(() => {
  CENTERING.position.x = random(0.25, 0.75) * WORLD.x;
  CENTERING.position.y = random(0.25, 0.75) * WORLD.y;
  //  run = !run;
  //  step();
}, 5000);
