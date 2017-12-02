import Vector from "./vector";
import { random } from "./helpers";

const ENTITY_SPEED = 3;
const ENTITY_INTERTIA = 10;
const ENTITY_ATTRACTION = 1;
const ENTITY_CORRELATE = 2;

const ENTITY_FOLLOW_DISTANCE = 100;
const ENTITY_REPEL_DISTANCE = 50;

const calculateCorrelationForce = dist => 1 - dist / ENTITY_FOLLOW_DISTANCE;

const calculateAttractionForce = dist => {
  if (dist <= ENTITY_REPEL_DISTANCE * 2) {
    return dist / ENTITY_REPEL_DISTANCE - 1;
  } else {
    return (
      1 -
      (dist - ENTITY_REPEL_DISTANCE) /
        (ENTITY_FOLLOW_DISTANCE - ENTITY_REPEL_DISTANCE)
    );
  }
};

const calculateForce = (self, other, strength, exponent) => {
  const delta = other.clone().subtract(self);
  const force = strength * Math.pow(delta.length(), exponent);
  return delta.normalize(force);
};

const calculateTargetsForce = (entity, targets) => {
  entity.target.reset();
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    const force = calculateForce(
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

    if (dist < ENTITY_FOLLOW_DISTANCE) {
      peers += 1;
      correlation.add(
        other.velocity.clone().normalize(calculateCorrelationForce(dist))
      );
      attraction.add(delta.normalize(calculateAttractionForce(dist)));
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
    .multiply(entity.inertia * ENTITY_INTERTIA)
    .add(entity.attraction.multiply(ENTITY_ATTRACTION))
    .add(entity.correlation.multiply(ENTITY_CORRELATE))
    .add(entity.target)
    .normalize(entity.speed * ENTITY_SPEED);
};

export const makeEntity = bounds => ({
  // Component forces
  attraction: new Vector(0, 0),
  correlation: new Vector(0, 0),
  target: new Vector(0, 0),

  // Physics
  position: new Vector(random(0, bounds.x), random(0, bounds.y)),
  velocity: new Vector(
    random(-ENTITY_SPEED, ENTITY_SPEED),
    random(-ENTITY_SPEED, ENTITY_SPEED)
  ),

  // Personality
  inertia: random(0.5, 2),
  speed: random(0.5, 1)
});
