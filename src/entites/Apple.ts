import { IPointData, Rectangle, Sprite, Texture } from 'pixi.js'
import { TILE_SIZE } from '../Constants'

export class Apple extends Sprite {
  bounds: Rectangle

  constructor () {
    super(Texture.from('apple'))
    this.width = TILE_SIZE
    this.height = TILE_SIZE

    this.bounds = new Rectangle()
    this.bounds.width = TILE_SIZE
    this.bounds.height = TILE_SIZE
  }

  public setPosition (newPosition: IPointData): void {
    this.bounds.x = newPosition.x
    this.bounds.y = newPosition.y
    this.position = newPosition
  }
}
