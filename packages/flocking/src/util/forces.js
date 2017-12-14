import { entity as config } from "../config";

export const correlationForce = dist => 1 - dist / config.FOLLOW_DISTANCE;

export const attractionForce = dist => {
  if (dist <= config.REPEL_DISTANCE * 2) {
    return dist / config.REPEL_DISTANCE - 1;
  } else {
    return (
      1 -
      (dist - config.REPEL_DISTANCE) /
        (config.FOLLOW_DISTANCE - config.REPEL_DISTANCE)
    );
  }
};

export const exponentialForce = (self, other, strength, exponent) => {
  const delta = other.clone().subtract(self);
  const force = strength * Math.pow(delta.length(), exponent);
  return delta.normalize(force);
};
