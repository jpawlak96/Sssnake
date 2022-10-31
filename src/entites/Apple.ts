import { Graphics, Rectangle } from "pixi.js";
import { TILES_NUMBER, TILE_SIZE } from "../Constants";
import { Snake } from "./Snake";
import { Utils } from "../Utils";
import { HUD } from "../HUD";

export class Apple {
  position: Rectangle = new Rectangle();
  snake: Snake;
  hud: HUD;

  constructor(snake: Snake, ui: HUD) {
    this.snake = snake;
    this.hud = ui;
    this.position = this.newPosition();
  }

  update() {
    if (this.snake.head.intersects(this.position)) {
      this.position = this.newPosition();
      this.snake.isHungry = false;
      this.hud.appleEaten++;
    }
  }

  draw(graphy: Graphics) {
    graphy.beginFill(0x00ff00);
    graphy.drawRect(
      this.position.x,
      this.position.y,
      this.position.width,
      this.position.height
    );
    graphy.endFill();
  }

  private newPosition() {
    while (true) {
      const newX = Utils.getRandomInt(TILES_NUMBER - 1) * TILE_SIZE;
      const newY = Utils.getRandomInt(TILES_NUMBER - 1) * TILE_SIZE;
      const newPosition = new Rectangle(newX, newY, TILE_SIZE, TILE_SIZE);
      const colisionSnakeParts = this.snake.parts.filter((part) =>
        part.intersects(newPosition)
      );
      if (!colisionSnakeParts.length) {
        return newPosition;
      }
    }
  }
}
