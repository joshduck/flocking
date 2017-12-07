import convert from "color-convert";

export const fillBounds = (ctx, bounds) => {
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(0, 0, bounds.x, bounds.y);
};

export const drawVector = (ctx, position, offset, multiplier) => {
  ctx.beginPath();
  ctx.moveTo(position.x, position.y);
  ctx.lineTo(
    position.x + offset.x * multiplier,
    position.y + offset.y * multiplier
  );
  ctx.stroke();
};

export const drawEntityForces = (ctx, entities) => {
  for (let i = 0; i < entities.length; i++) {
    const { position, attraction, correlation, target } = entities[i];

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "red";
    drawVector(ctx, position, target, 10);

    ctx.strokeStyle = "red";
    drawVector(ctx, position, attraction, 20);

    ctx.strokeStyle = "red";
    drawVector(ctx, position, correlation, 20);
  }
};

export const drawEntities = (ctx, entities) => {
  for (let i = 0; i < entities.length; i++) {
    const { position, velocity } = entities[i];

    ctx.lineWidth = 2;
    ctx.strokeStyle =
      "#" + convert.hsl.hex((entities[i].speed * 512) % 255, 100, 70);
    drawVector(ctx, position, velocity, -1);
  }
};

export const drawTargets = (ctx, targets) => {
  for (let i = 0; i < targets.length; i++) {
    const { position } = targets[i];
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(position.x, position.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
  }
};
