import { Application, Container, Graphics } from 'pixi.js'
import { Apple } from '../entites/Apple'
import { TICK_PER_SEC } from '../Constants'
import { Snake } from '../entites/Snake'
import { State } from '../enums/State'
import { HUD } from '../HUD'
import { IScene } from '../managers/IScene'

export class GameScene extends Container implements IScene {
  app: Application
  graphy: Graphics
  state: State
  hud: HUD
  deltaCounter: number = 0

  snake: Snake
  apple: Apple

  constructor (app: Application) {
    super()

    this.app = app
    this.app.ticker.add(this.update, this)

    this.graphy = new Graphics()
    this.app.stage.addChild(this.graphy)

    this.state = State.Started

    this.hud = new HUD(this.app)

    this.snake = new Snake(this.app.screen)
    this.apple = new Apple(this.snake, this.hud)
  }

  update (): void {
    if (this.state !== State.GameOver) {
      this.deltaCounter += this.app.ticker.elapsedMS / 1000
      if (this.deltaCounter > 1 / TICK_PER_SEC) {
        this.deltaCounter -= 1 / TICK_PER_SEC
        this.snake.update()
        this.apple.update()
        this.checkColision()
      }
    }
    this.draw()
  }

  private draw (): void {
    this.graphy.clear()
    this.snake.draw(this.graphy)
    this.apple.draw(this.graphy)
    this.hud.draw(this.state)
  }

  private checkColision (): void {
    if (this.isColision()) {
      this.state = State.GameOver
    }
  }

  private isColision (): boolean {
    return (
      !this.app.screen.intersects(this.snake.head) ||
      this.snake.parts.filter((part) => part !== this.snake.head && part.intersects(this.snake.head)).length !== 0
    )
  }
}
