import { Container, Rectangle, Sprite } from 'pixi.js'
import { TILE_SIZE } from '../Constants'
import { areOpposite, Direction } from '../enums/Direction'

export class Snake extends Container {
  parts: Rectangle[]
  head: Rectangle

  isHungry: boolean = true

  moveDirection: Direction = Direction.Down
  lastMoveDirection: Direction = this.moveDirection

  constructor () {
    super()
    this.parts = this.generateParts()
    this.head = this.parts[this.parts.length - 1]
    this.generateSprite()
  }

  update (): void {
    let newHead: Rectangle
    switch (this.moveDirection) {
      case Direction.Down:
        newHead = new Rectangle(this.head.x, this.head.y + this.head.height, this.head.width, this.head.height)
        break
      case Direction.Up:
        newHead = new Rectangle(this.head.x, this.head.y - this.head.height, this.head.width, this.head.height)
        break
      case Direction.Left:
        newHead = new Rectangle(this.head.x - this.head.width, this.head.y, this.head.width, this.head.height)
        break
      case Direction.Right:
        newHead = new Rectangle(this.head.x + this.head.width, this.head.y, this.head.width, this.head.height)
        break
    }
    this.lastMoveDirection = this.moveDirection
    this.head = newHead
    this.parts.push(newHead)
    if (this.isHungry) {
      this.parts.shift()
    }
    this.isHungry = true
    this.generateSprite()
  }

  updateMoveDirection (direction: Direction): void {
    if (direction !== null && !areOpposite(this.lastMoveDirection, direction)) {
      this.moveDirection = direction
    }
  }

  private generateParts (): Rectangle[] {
    return [
      new Rectangle(0, 0 * TILE_SIZE, TILE_SIZE, TILE_SIZE),
      new Rectangle(0, 1 * TILE_SIZE, TILE_SIZE, TILE_SIZE),
      new Rectangle(0, 2 * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    ]
  }

  private generateSprite (): void {
    this.removeChildren()
    this.generateTail()
    this.generateBody()
    this.generateHead()
  }

  private generateHead (): void {
    let headSprite: Sprite
    switch (this.moveDirection) {
      case Direction.Up:
        headSprite = Sprite.from('snake-head-top')
        break
      case Direction.Down:
        headSprite = Sprite.from('snake-head-bottom')
        break
      case Direction.Left:
        headSprite = Sprite.from('snake-head-left')
        break
      case Direction.Right:
        headSprite = Sprite.from('snake-head-right')
        break
    }
    headSprite.position.set(this.head.x, this.head.y)
    headSprite.width = this.head.width
    headSprite.height = this.head.height
    this.addChild(headSprite)
  }

  private generateBody (): void {
    for (let index = this.parts.length - 2; index > 0; index--) {
      const previousPart = this.parts[index - 1]
      const nextPart = this.parts[index + 1]
      const part = this.parts[index]

      const tempX: number = previousPart.x + nextPart.x - part.x * 2
      const tempY: number = previousPart.y + nextPart.y - part.y * 2

      let sprite: Sprite
      if (tempX < 0 && tempY < 0) {
        sprite = Sprite.from('snake-body-top-left')
      } else if (tempX < 0 && tempY > 0) {
        sprite = Sprite.from('snake-body-bottom-left')
      } else if (tempX > 0 && tempY > 0) {
        sprite = Sprite.from('snake-body-bottom-right')
      } else if (tempX > 0 && tempY < 0) {
        sprite = Sprite.from('snake-body-top-right')
      } else if (previousPart.x === nextPart.x) {
        sprite = Sprite.from('snake-body-vertical')
      } else {
        sprite = Sprite.from('snake-body-horizontal')
      }
      sprite.position.set(this.parts[index].x, this.parts[index].y)
      sprite.width = part.width
      sprite.height = part.height
      this.addChild(sprite)
    }
  }

  private generateTail (): void {
    const nextPart = this.parts[1]
    const tailPart = this.parts[0]
    let tailSprite: Sprite
    if (nextPart.x === tailPart.x && nextPart.y < tailPart.y) {
      tailSprite = Sprite.from('snake-tail-bottom')
    } else if (nextPart.x === tailPart.x && nextPart.y > tailPart.y) {
      tailSprite = Sprite.from('snake-tail-top')
    } else if (nextPart.x > tailPart.x && nextPart.y === tailPart.y) {
      tailSprite = Sprite.from('snake-tail-right')
    } else {
      tailSprite = Sprite.from('snake-tail-left')
    }
    tailSprite.position.set(tailPart.x, tailPart.y)
    tailSprite.width = tailPart.width
    tailSprite.height = tailPart.height
    this.addChild(tailSprite)
  }
}
