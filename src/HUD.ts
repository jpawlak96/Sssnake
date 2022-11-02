import { Application, BitmapText } from 'pixi.js'
import { State } from './enums/State'

export class HUD {
  appleEaten: number = 0

  scoreText: BitmapText = new BitmapText('0 apples', { fontName: 'comic 32' })
  endText: BitmapText = new BitmapText('', { fontName: 'comic 32' })

  constructor (app: Application) {
    this.endText.x = app.screen.width / 2
    this.endText.y = app.screen.height / 2
    this.endText.anchor.x = 0.5
    this.endText.anchor.y = 0.5

    app.stage.addChild(this.scoreText)
    app.stage.addChild(this.endText)
  }

  draw (state: State): void {
    this.scoreText.text = this.appleEaten + ' apples'
    if (state === State.GameOver) {
      this.endText.text = 'You die'
    }
  }
}
