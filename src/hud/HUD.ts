import { BitmapText, Container } from 'pixi.js'
import { FONT_NAME } from '../Constants'
import { State } from '../enums/State'

export class HUD extends Container {
  eatenApples: number = 0

  scoreText: BitmapText = new BitmapText('0 apples', { fontName: FONT_NAME })
  endText: BitmapText = new BitmapText('', { fontName: FONT_NAME })

  constructor (width: number, height: number) {
    super()

    this.endText.position.set(width / 2, height / 2)
    this.endText.anchor.set(0.5)
    this.addChild(this.endText)
    this.addChild(this.scoreText)
  }

  update (state: State): void {
    this.scoreText.text = `${this.eatenApples} apples`
    if (state === State.GameOver) {
      this.endText.text = 'You die'
    }
  }

  increaseEatenApples (): void {
    this.eatenApples++
  }
}
