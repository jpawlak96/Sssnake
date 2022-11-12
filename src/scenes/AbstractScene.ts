import { Container, DisplayObject, Rectangle } from 'pixi.js'
import { Input } from '../inputs/Input'

export abstract class AbstractContainer extends Container implements DisplayObject {
  bounds: Rectangle
  input: Input

  constructor (width: number, height: number, input: Input) {
    super()
    this.bounds = new Rectangle(0, 0, width, height)
    this.input = input
  }

  abstract update (deltaTime: number): void
}
