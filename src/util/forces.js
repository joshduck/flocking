import { ENTITY } from "../config";

export const correlationForce = dist => 1 - dist / ENTITY.FOLLOW_DISTANCE;

export const attractionForce = dist => {
  if (dist <= ENTITY.REPEL_DISTANCE * 2) {
    return dist / ENTITY.REPEL_DISTANCE - 1;
  } else {
    return (
      1 -
      (dist - ENTITY.REPEL_DISTANCE) /
        (ENTITY.FOLLOW_DISTANCE - ENTITY.REPEL_DISTANCE)
    );
  }
};

export const exponentialForce = (self, other, strength, exponent) => {
  const delta = other.clone().subtract(self);
  const force = strength * Math.pow(delta.length(), exponent);
  return delta.normalize(force);
};
