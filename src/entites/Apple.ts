import { Rectangle, Sprite, Texture } from 'pixi.js'
import { TILE_SIZE } from '../Constants'

export class Apple extends Sprite {
  constructor () {
    super(Texture.from('apple'))
    this.width = TILE_SIZE
    this.height = TILE_SIZE
  }

  public override getBounds (): Rectangle {
    return new Rectangle(this.x, this.y, TILE_SIZE, TILE_SIZE)
  }
}
