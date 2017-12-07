import Vector from "./util/vector";
import Entity from "./entity";
import { world as config } from "./config";

export const makeWorld = () => {
  const bounds = new Vector(1000, 500);

  const homingBeacon = {
    strength: 0.004,
    exponent: 1,
    position: bounds.clone().multiply(0.5)
  };

  const touchPoint = {
    strength: -1000,
    exponent: -1.5,
    position: bounds.clone().multiply(0.5)
  };

  const entities = Array(config.ENTITIES);
  for (let i = 0; i < entities.length; i++) {
    entities[i] = new Entity(bounds);
  }

  return {
    bounds,
    homingBeacon,
    touchPoint,

    targets: [homingBeacon, touchPoint],
    entities
  };
};
