import { TICK_PER_SEC, TILES_NUMBER, TILE_SIZE } from '../Constants'
import { State } from '../enums/State'
import { HUD } from '../hud/HUD'
import { AbstractContainer } from './AbstractScene'
import { Apple } from '../entites/Apple'
import { Snake } from '../entites/Snake'
import * as Utils from '../Utils'
import { IPointData, Rectangle } from 'pixi.js'

export class GameScene extends AbstractContainer {
  state: State
  hud: HUD
  deltaCounter: number = 0

  snake: Snake
  apple: Apple

  constructor (width: number, height: number) {
    super(width, height)

    this.state = State.Started

    this.hud = new HUD(this.bounds.width, this.bounds.height)
    this.snake = new Snake()
    this.apple = new Apple()
    const newApplePosition = this.generateApplePosition()
    this.apple.position = newApplePosition

    this.addChild(this.apple)
    this.addChild(this.snake)
    this.addChild(this.hud)
  }

  update (deltaTime: number): void {
    if (this.state !== State.GameOver) {
      this.deltaCounter += deltaTime / 1000
      if (this.deltaCounter > 1 / TICK_PER_SEC) {
        this.deltaCounter -= 1 / TICK_PER_SEC
        this.snake.update()
        this.updateGameState()
      }
    }
    this.hud.update(this.state)
  }

  private updateGameState (): void {
    if (this.isSnakeCollides()) {
      this.state = State.GameOver
    } else if (this.isSnakeEats()) {
      const newApplePosition = this.generateApplePosition()
      this.apple.position = newApplePosition
      this.snake.isHungry = false
      this.hud.increaseEatenApples()
    }
  }

  private isSnakeCollides (): boolean {
    return (
      !this.bounds.intersects(this.snake.head) ||
      this.snake.parts.filter((part) =>
        part !== this.snake.head &&
        part.intersects(this.snake.head)).length !== 0
    )
  }

  private isSnakeEats (): boolean {
    return this.snake.head.intersects(this.apple.getBounds())
  }

  private generateApplePosition (): IPointData {
    while (true) {
      const newX = Utils.getRandomInt(TILES_NUMBER - 1) * TILE_SIZE
      const newY = Utils.getRandomInt(TILES_NUMBER - 1) * TILE_SIZE

      const newPosition = new Rectangle(newX, newY, TILE_SIZE, TILE_SIZE)

      const colisionSnakeParts = this.snake.parts.filter((part) =>
        part.intersects(newPosition)
      )
      if (colisionSnakeParts.length === 0) {
        return { x: newX, y: newY }
      }
    }
  }
}
