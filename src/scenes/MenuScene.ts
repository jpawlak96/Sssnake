import { BitmapText } from 'pixi.js'
import { FONT_NAME } from '../Constants'
import { Manager } from '../Manager'
import { AbstractContainer } from './AbstractScene'
import { GameScene } from './GameScene'

export class MenuScene extends AbstractContainer {
  startPrompt: BitmapText
  scaleVelocity: number = 0.008
  deltaCounter: number = 0
  tickTime: number = 0.5

  constructor (width: number, height: number) {
    super(width, height)

    this.startPrompt = new BitmapText('Press any key to start', { fontName: FONT_NAME })
    this.startPrompt.position.set(this.bounds.width / 2, this.bounds.height / 2)
    this.startPrompt.anchor.set(0.5)
    this.addChild(this.startPrompt)

    document.addEventListener('keydown', () => Manager.changeScene(GameScene), { once: true })
  }

  update (deltaTime: number): void {
    this.deltaCounter += deltaTime / 1000
    if (this.deltaCounter > this.tickTime) {
      this.scaleVelocity *= -1
      this.deltaCounter -= this.tickTime
    }
    const currentScale = this.startPrompt.scale.x + this.scaleVelocity * this.deltaCounter
    this.startPrompt.scale.set(currentScale)
  }
}
