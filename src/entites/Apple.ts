import { Rectangle, Sprite, Texture } from 'pixi.js'
import { HUD } from '../hud/HUD'
import * as Utils from '../Utils'
import { TILES_NUMBER, TILE_SIZE } from '../Constants'
import { Snake } from './Snake'

export class Apple extends Sprite {
  snake: Snake
  hud: HUD

  constructor (snake: Snake, hud: HUD) {
    super(Texture.from('apple'))
    this.width = TILE_SIZE
    this.height = TILE_SIZE

    this.snake = snake
    this.hud = hud

    this.changePosition()
  }

  update (): void {
    if (this.snake.head.intersects(this.getBounds())) {
      this.changePosition()
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

  private changePosition (): void {
    while (true) {
      const newX = Utils.getRandomInt(TILES_NUMBER - 1) * this.width
      const newY = Utils.getRandomInt(TILES_NUMBER - 1) * this.height

      const newPosition = new Rectangle(newX, newY, TILE_SIZE, TILE_SIZE)

      const colisionSnakeParts = this.snake.parts.filter((part) =>
        part.intersects(newPosition)
      )
      if (colisionSnakeParts.length === 0) {
        this.position.set(newX, newY)
        return
      }
    }
  }
}
