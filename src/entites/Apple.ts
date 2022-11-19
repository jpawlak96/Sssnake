import { IPointData, Rectangle, Sprite, Texture } from 'pixi.js'

export class Apple extends Sprite {
  bounds: Rectangle

  constructor () {
    super(Texture.from('apple.png'))
    this.bounds = new Rectangle()
    this.bounds.width = this.width
    this.bounds.height = this.height
  }

  public setPosition (newPosition: IPointData): void {
    this.bounds.x = newPosition.x
    this.bounds.y = newPosition.y
    this.position = newPosition
  }
}
