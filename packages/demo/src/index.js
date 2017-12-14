import Simulation from "@joshduck/flocking";

const canvas = document.getElementById("canvas");
const startButton = document.getElementById("start");
const frameButton = document.getElementById("frame");
const debugButton = document.getElementById("debug");

let debug = false;
const simulation = new Simulation(canvas);
simulation.start();

startButton.addEventListener("click", () => simulation.start());
frameButton.addEventListener("click", () => {
  simulation.stop();
  simulation.frame();
});
debugButton.addEventListener("click", () => {
  debug = !debug;
  simulation.setConfig({ debug: debug });
  simulation.draw();
});
