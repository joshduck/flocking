import convert from "color-convert";
import Vector from "./vector";
import { updateVelocity } from "./entity";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const WORLD_WIDTH = 1000;
const WORLD_HEIGHT = 500;

const ENTITY_SPEED = 3;
const ENTITY_INTERTIA = 10;
const ENTITY_ATTRACTION = 1;
const ENTITY_CORRELATE = 2;

const ENTITY_FOLLOW_DISTANCE = 100;
const ENTITY_REPEL_DISTANCE = 50;

const target1 = {
  strength: 0.004,
  exponent: 1,
  position: new Vector(WORLD_WIDTH / 2, WORLD_HEIGHT / 2)
};
const target2 = {
  strength: -1000,
  exponent: -1.5,
  position: new Vector(WORLD_WIDTH / 2, WORLD_HEIGHT / 2)
};

const random = (min, max) => min + Math.random() * (max - min);

const makeNodes = count => {
  const entities = Array(count);
  for (let i = 0; i < entities.length; i++) {
    entities[i] = {
      attraction: new Vector(0, 0),
      correlation: new Vector(0, 0),
      inertia: random(0.5, 2),
      speed: random(0.5, 1),
      position: new Vector(random(0, WORLD_WIDTH), random(0, WORLD_HEIGHT)),
      velocity: new Vector(
        random(-ENTITY_SPEED, ENTITY_SPEED),
        random(-ENTITY_SPEED, ENTITY_SPEED)
      )
    };
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
  ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
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
  const targets = [target1, target2];
  attractNodes(entities, targets);
  moveNodes(entities);
  drawFill();
  drawTargets(targets);
  drawNodes(entities);
  requestAnimationFrame(step);
};

window.onmousemove = e => {
  target2.position.x = e.offsetX;
  target2.position.y = e.offsetY;
  //console.log(e);
};

step();
setInterval(() => {
  target1.position.x = random(0.25, 0.75) * WORLD_WIDTH;
  target1.position.y = random(0.25, 0.75) * WORLD_HEIGHT;
  //  run = !run;
  //  step();
}, 5000);
