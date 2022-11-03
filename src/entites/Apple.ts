import { Graphics, Rectangle } from 'pixi.js'
import { TILES_NUMBER, TILE_SIZE } from '../Constants'
import { Snake } from './Snake'
import { HUD } from '../hud/HUD'
import * as Utils from '../Utils'

export class Apple {
  position!: Rectangle
  snake: Snake
  hud: HUD

  constructor (snake: Snake, hud: HUD) {
    this.snake = snake
    this.hud = hud
    this.position = this.newPosition()
  }

  update (): void {
    if (this.snake.head.intersects(this.position)) {
      this.position = this.newPosition()
      this.snake.isHungry = false
      this.hud.increaseEatenApples()
    }
  }

  draw (graphy: Graphics): void {
    graphy.beginFill(0x00ff00)
    graphy.drawRect(
      this.position.x,
      this.position.y,
      this.position.width,
      this.position.height
    )
    graphy.endFill()
  }

  private newPosition (): Rectangle {
    while (true) {
      const newX = Utils.getRandomInt(TILES_NUMBER - 1) * TILE_SIZE
      const newY = Utils.getRandomInt(TILES_NUMBER - 1) * TILE_SIZE
      const newPosition = new Rectangle(newX, newY, TILE_SIZE, TILE_SIZE)
      const colisionSnakeParts = this.snake.parts.filter((part) =>
        part.intersects(newPosition)
      )
      if (colisionSnakeParts.length === 0) {
        return newPosition
      }
    }
  }
}
