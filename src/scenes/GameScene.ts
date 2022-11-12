import { TICK_PER_SEC, TILE_SIZE } from '../Constants'
import { State } from '../enums/State'
import { HUD } from '../hud/HUD'
import { AbstractContainer } from './AbstractScene'
import { Apple } from '../entites/Apple'
import { Snake } from '../entites/Snake'
import * as Utils from '../Utils'
import { IPointData, Rectangle } from 'pixi.js'
import { Input } from '../inputs/Input'
import { Manager } from '../Manager'
import { MenuScene } from './MenuScene'

export class GameScene extends AbstractContainer {
  state: State = State.Started
  deltaCounter: number = 0

  snake: Snake
  apple: Apple
  hud: HUD

  constructor (width: number, height: number, input: Input) {
    super(width, height, input)

    this.snake = new Snake()
    const snakeHandeler = this.snake.updateMoveDirection.bind(this.snake)
    this.input.setDirectionChangeEventHandler(snakeHandeler)
    this.addChild(this.snake)

    this.apple = new Apple()
    this.apple.position = this.generateApplePosition()
    this.addChild(this.apple)

    this.hud = new HUD(this.bounds.width, this.bounds.height)
    this.addChild(this.hud)
  }

  update (deltaTime: number): void {
    this.deltaCounter += deltaTime / 1000
    if (this.state !== State.GameOver) {
      if (this.deltaCounter > 1 / TICK_PER_SEC) {
        this.deltaCounter -= 1 / TICK_PER_SEC
        this.snake.update()
        this.updateGameState()
      }
    }
    this.hud.update(this.state, this.deltaCounter)
  }

  private updateGameState (): void {
    if (this.isSnakeCollides()) {
      this.state = State.GameOver
      this.input.setAnyEventHandler(() => Manager.changeScene(MenuScene))
    } else if (this.isSnakeEats()) {
      this.apple.position = this.generateApplePosition()
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
      const newX = Utils.getRandomInt(this.width / TILE_SIZE - 1) * TILE_SIZE
      const newY = Utils.getRandomInt(this.height / TILE_SIZE - 1) * TILE_SIZE

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
