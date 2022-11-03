import { Graphics } from 'pixi.js'
import { Apple } from '../entites/Apple'
import { TICK_PER_SEC } from '../Constants'
import { Snake } from '../entites/Snake'
import { State } from '../enums/State'
import { HUD } from '../hud/HUD'
import { AbstractContainer } from './AbstractScene'

export class GameScene extends AbstractContainer {
  graphy: Graphics
  state: State
  hud: HUD
  deltaCounter: number = 0

  snake: Snake
  apple: Apple

  constructor (width: number, height: number) {
    super(width, height)

    this.graphy = new Graphics()
    this.addChild(this.graphy)

    this.state = State.Started

    this.hud = new HUD(this.bounds.width, this.bounds.height)
    this.addChild(this.hud)

    this.snake = new Snake()
    this.apple = new Apple(this.snake, this.hud)
  }

  update (deltaTime: number): void {
    if (this.state !== State.GameOver) {
      this.deltaCounter += deltaTime / 1000
      if (this.deltaCounter > 1 / TICK_PER_SEC) {
        this.deltaCounter -= 1 / TICK_PER_SEC
        this.snake.update()
        this.apple.update()
        this.updateGameState()
      }
    }
    this.hud.update(this.state)
    this.draw()
  }

  private draw (): void {
    this.graphy.clear()
    this.snake.draw(this.graphy)
    this.apple.draw(this.graphy)
  }

  private updateGameState (): void {
    if (this.isColision()) {
      this.state = State.GameOver
    }
  }

  private isColision (): boolean {
    return (
      !this.bounds.intersects(this.snake.head) ||
      this.snake.parts.filter((part) =>
        part !== this.snake.head &&
        part.intersects(this.snake.head)).length !== 0
    )
  }
}
