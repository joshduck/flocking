import Vector from "./util/vector";
import random from "./util/random";
import {
  attractionForce,
  correlationForce,
  exponentialForce
} from "./util/forces";
import { entity as config } from "./config";

export default class Entity {
  constructor(bounds) {
    // Component forces
    this.attraction = new Vector(0, 0);
    this.correlation = new Vector(0, 0);
    this.target = new Vector(0, 0);

    // Physics
    this.position = new Vector(random(0, bounds.x), random(0, bounds.y));
    this.velocity = new Vector(
      random(-config.SPEED, config.SPEED),
      random(-config.SPEED, config.SPEED)
    );

    // Personality
    this.inertia = random(0.5, 2);
    this.speed = random(0.5, 1);
  }

  updateTargetForces(targets) {
    this.target.reset();
    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      const force = exponentialForce(
        this.position,
        target.position,
        target.strength,
        target.exponent
      );
      this.target.add(force);
    }
  }

  updatePeerForces(entities) {
    const { attraction, correlation } = this;
    attraction.reset();
    correlation.reset();
    let peers = 1;

    for (let i = 0; i < entities.length; i++) {
      const other = entities[i];
      if (other === this) continue;

      const delta = other.position.clone().subtract(this.position);
      const dist = delta.length();

      if (dist < config.FOLLOW_DISTANCE) {
        peers += 1;
        correlation.add(
          other.velocity.clone().normalize(correlationForce(dist))
        );
        attraction.add(delta.normalize(attractionForce(dist)));
      }
    }

    attraction.multiply(1 / peers);
    correlation.multiply(1 / peers);
  }

  updateVelocity(entities, targets) {
    this.updatePeerForces(entities);
    this.updateTargetForces(targets);

    // Apply forces with weighting
    this.velocity
      .multiply(this.inertia * config.INTERTIA)
      .add(this.attraction.multiply(config.ATTRACTION))
      .add(this.correlation.multiply(config.CORRELATE))
      .add(this.target)
      .normalize(this.speed * config.SPEED);
  }

  updatePosition() {
    this.position.add(this.velocity);
  }
}
