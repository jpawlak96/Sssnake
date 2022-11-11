import { Text, Container } from 'pixi.js'
import { State } from '../enums/State'

export class HUD extends Container {
  eatenApples: number = 0

  scoreText: Text = new Text('0 apples', { fontFamily: 'ComicGecko', fontSize: 32 })
  endText: Text = new Text('', { fontFamily: 'ComicGecko', fontSize: 128 })

  constructor (width: number, height: number) {
    super()
    this.endText.position.set(width / 2, height / 2)
    this.endText.anchor.set(0.5)
    this.addChild(this.endText)

    this.scoreText.position.set(width / 30, height / 30)
    this.addChild(this.scoreText)
  }

  update (state: State, deltaCounter: number): void {
    this.scoreText.text = `${this.eatenApples} apples`
    if (state === State.GameOver) {
      if (deltaCounter < 2) {
        this.endText.height += deltaCounter
        this.endText.width += deltaCounter
      }
      this.endText.text = 'You die'
    }
  }

  increaseEatenApples (): void {
    this.eatenApples++
  }
}
