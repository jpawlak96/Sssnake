import { Text } from 'pixi.js'
import { Input } from '../inputs/Input'
import { Manager } from '../Manager'
import { AbstractContainer } from './AbstractScene'
import { GameScene } from './GameScene'

export class MenuScene extends AbstractContainer {
  startPrompt: Text
  scaleVelocity: number = 0.008
  deltaCounter: number = 0
  tickTime: number = 0.5

  constructor (width: number, height: number, input: Input) {
    super(width, height, input)

    const logoShadow = new Text('SSSNAKE', { fontFamily: 'ComicGecko', fontSize: 140, fill: 0xe6e600 })
    logoShadow.position.set(this.bounds.width / 2 + 5, this.bounds.height / 6 * 2 + 5)
    logoShadow.anchor.set(0.5)
    this.addChild(logoShadow)

    const logo = new Text('SSSNAKE', { fontFamily: 'ComicGecko', fontSize: 140, fill: 0xffff00 })
    logo.position.set(this.bounds.width / 2 - 5, this.bounds.height / 6 * 2 - 5)
    logo.anchor.set(0.5)
    this.addChild(logo)

    this.startPrompt = new Text('Press any key to start', { fontFamily: 'ComicGecko', fontSize: 32 })
    this.startPrompt.position.set(this.bounds.width / 2, this.bounds.height / 6 * 4)
    this.startPrompt.anchor.set(0.5)
    this.addChild(this.startPrompt)

    input.setAnyEventHandler(() => Manager.changeScene(GameScene))
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
