import { TICK_PER_SEC } from '../Constants'
import { State } from '../enums/State'
import { HUD } from '../hud/HUD'
import { AbstractContainer } from './AbstractScene'
import { Apple } from '../entites/Apple'
import { Snake } from '../entites/Snake'

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
    this.apple = new Apple(this.snake, this.hud)

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
        this.apple.update()
        this.updateGameState()
      }
    }
    this.hud.update(this.state)
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
