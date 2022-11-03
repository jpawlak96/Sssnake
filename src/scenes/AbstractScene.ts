import { Container, DisplayObject, Rectangle } from 'pixi.js'

export abstract class AbstractContainer extends Container implements DisplayObject {
  bounds: Rectangle

  constructor (width: number, height: number) {
    super()
    this.bounds = new Rectangle(0, 0, width, height)
  }

  abstract update (deltaTime: number): void
}
