import { Container, DisplayObject, Graphics, Rectangle } from 'pixi.js'
import { Input } from '../inputs/Input'

export abstract class AbstractContainer extends Container implements DisplayObject {
  bounds: Rectangle
  input: Input

  constructor (width: number, height: number, input: Input) {
    super()
    this.bounds = new Rectangle(0, 0, width, height)
    this.input = input

    const background = new Graphics()
    background.beginFill(0x008000)
    background.drawRect(0, 0, this.bounds.width, this.bounds.height)
    background.endFill()
    this.addChild(background)
  }

  abstract update (deltaTime: number): void
}
