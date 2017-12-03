import Vector from "./util/vector";
import random from "./util/random";
import {
  attractionForce,
  correlationForce,
  exponentialForce
} from "./util/forces";
import { ENTITY } from "./config";

const calculateTargetsForce = (entity, targets) => {
  entity.target.reset();
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    const force = exponentialForce(
      entity.position,
      target.position,
      target.strength,
      target.exponent
    );
    entity.target.add(force);
  }
};

const calculatePeerPressure = (entity, entities) => {
  const { attraction, correlation } = entity;
  attraction.reset();
  correlation.reset();
  let peers = 1;

  for (let i = 0; i < entities.length; i++) {
    const other = entities[i];
    if (other === entity) continue;

    const delta = other.position.clone().subtract(entity.position);
    const dist = delta.length();

    if (dist < ENTITY.FOLLOW_DISTANCE) {
      peers += 1;
      correlation.add(other.velocity.clone().normalize(correlationForce(dist)));
      attraction.add(delta.normalize(attractionForce(dist)));
    }
  }

  attraction.multiply(1 / peers);
  correlation.multiply(1 / peers);
};

export const updateVelocity = (entity, entities, targets) => {
  calculatePeerPressure(entity, entities);
  calculateTargetsForce(entity, targets);

  // Apply forces with weighting
  entity.velocity
    .multiply(entity.inertia * ENTITY.INTERTIA)
    .add(entity.attraction.multiply(ENTITY.ATTRACTION))
    .add(entity.correlation.multiply(ENTITY.CORRELATE))
    .add(entity.target)
    .normalize(entity.speed * ENTITY.SPEED);
};

export const makeEntity = bounds => ({
  // Component forces
  attraction: new Vector(0, 0),
  correlation: new Vector(0, 0),
  target: new Vector(0, 0),

  // Physics
  position: new Vector(random(0, bounds.x), random(0, bounds.y)),
  velocity: new Vector(
    random(-ENTITY.SPEED, ENTITY.SPEED),
    random(-ENTITY.SPEED, ENTITY.SPEED)
  ),

  // Personality
  inertia: random(0.5, 2),
  speed: random(0.5, 1)
});
