import { Rectangle, Sprite } from 'pixi.js'
import { TILE_SIZE } from '../Constants'
import { Direction } from '../enums/Direction'

export class Snake extends Sprite {
  parts: Rectangle[]
  head: Rectangle

  isHungry: boolean = true

  moveDirection: Direction = Direction.Up
  oldMoveDirection: Direction = this.moveDirection

  constructor () {
    super()
    this.parts = [
      new Rectangle(4 * TILE_SIZE, 4 * TILE_SIZE, TILE_SIZE, TILE_SIZE),
      new Rectangle(4 * TILE_SIZE, 3 * TILE_SIZE, TILE_SIZE, TILE_SIZE),
      new Rectangle(4 * TILE_SIZE, 2 * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    ]
    this.head = this.parts[this.parts.length - 1]
    window.addEventListener('keydown', this.handleKeyboardEvent.bind(this), false)
    this.generateSprite()
  }

  update (): void {
    let newHead: Rectangle
    switch (this.moveDirection) {
      case Direction.Down:
        newHead = new Rectangle(this.head.x, this.head.y + TILE_SIZE, TILE_SIZE, TILE_SIZE)
        break
      case Direction.Up:
        newHead = new Rectangle(this.head.x, this.head.y - TILE_SIZE, TILE_SIZE, TILE_SIZE)
        break
      case Direction.Left:
        newHead = new Rectangle(this.head.x - TILE_SIZE, this.head.y, TILE_SIZE, TILE_SIZE)
        break
      case Direction.Right:
        newHead = new Rectangle(this.head.x + TILE_SIZE, this.head.y, TILE_SIZE, TILE_SIZE)
        break
    }
    this.head = newHead
    this.parts.push(newHead)
    this.oldMoveDirection = this.moveDirection
    if (this.isHungry) {
      this.parts.shift()
    }
    this.isHungry = true
    this.generateSprite()
  }

  private generateSprite (): void {
    this.removeChildren()

    const previousPart = this.parts[1]
    const tailPart = this.parts[0]
    let tailSprite: Sprite
    if (previousPart.x === tailPart.x && previousPart.y < tailPart.y) {
      tailSprite = Sprite.from('snake-tail-bottom')
    } else if (previousPart.x === tailPart.x && previousPart.y > tailPart.y) {
      tailSprite = Sprite.from('snake-tail-top')
    } else if (previousPart.x > tailPart.x && previousPart.y === tailPart.y) {
      tailSprite = Sprite.from('snake-tail-right')
    } else {
      tailSprite = Sprite.from('snake-tail-left')
    }
    tailSprite.position.set(tailPart.x, tailPart.y)
    tailSprite.width = TILE_SIZE
    tailSprite.height = TILE_SIZE
    this.addChild(tailSprite)

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
      sprite.width = TILE_SIZE
      sprite.height = TILE_SIZE
      this.addChild(sprite)
    }

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
    headSprite.width = TILE_SIZE
    headSprite.height = TILE_SIZE
    this.addChild(headSprite)
  }

  private handleKeyboardEvent (event: any): void {
    switch (event.key) {
      case 'ArrowUp':
        if (this.oldMoveDirection === Direction.Down) break
        this.moveDirection = Direction.Up
        break
      case 'ArrowDown':
        if (this.oldMoveDirection === Direction.Up) break
        this.moveDirection = Direction.Down
        break
      case 'ArrowLeft':
        if (this.oldMoveDirection === Direction.Right) break
        this.moveDirection = Direction.Left
        break
      case 'ArrowRight':
        if (this.oldMoveDirection === Direction.Left) break
        this.moveDirection = Direction.Right
        break
    }
  }
}
