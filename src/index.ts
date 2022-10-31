import { Application, BitmapFont } from "pixi.js";
import { SCREEN_SIZE } from "./Constants";
import { Game } from "./Game";

BitmapFont.from("comic 32", {
  fill: "#000000",
  fontFamily: "Comic Sans MS",
  fontSize: 32,
});

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0xffffff,
  width: SCREEN_SIZE,
  height: SCREEN_SIZE,
});

new Game(app);