import { Graphics, Rectangle } from 'pixi.js'
import { TILE_SIZE } from '../Constants'
import { Direction } from '../enums/Direction'

export class Snake {
  screen: Rectangle

  parts: Rectangle[]
  head: Rectangle

  isHungry: boolean = true

  moveDirection: Direction = Direction.Up
  oldMoveDirection: Direction = this.moveDirection

  constructor (screen: Rectangle) {
    this.screen = screen
    this.parts = [
      new Rectangle(4 * TILE_SIZE, 4 * TILE_SIZE, TILE_SIZE, TILE_SIZE),
      new Rectangle(4 * TILE_SIZE, 3 * TILE_SIZE, TILE_SIZE, TILE_SIZE),
      new Rectangle(4 * TILE_SIZE, 2 * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    ]
    this.head = this.parts[this.parts.length - 1]
    window.addEventListener(
      'keydown',
      this.handleKeyboardEvent.bind(this),
      false
    )
  }

  update (): void {
    let newHead: Rectangle
    switch (this.moveDirection) {
      case Direction.Down:
        newHead = new Rectangle(
          this.head.x,
          this.head.y + TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE
        )
        break
      case Direction.Up:
        newHead = new Rectangle(
          this.head.x,
          this.head.y - TILE_SIZE,
          TILE_SIZE,
          TILE_SIZE
        )
        break
      case Direction.Left:
        newHead = new Rectangle(
          this.head.x - TILE_SIZE,
          this.head.y,
          TILE_SIZE,
          TILE_SIZE
        )
        break
      case Direction.Right:
        newHead = new Rectangle(
          this.head.x + TILE_SIZE,
          this.head.y,
          TILE_SIZE,
          TILE_SIZE
        )
        break
    }
    this.head = newHead
    this.parts.push(newHead)
    this.oldMoveDirection = this.moveDirection
    if (this.isHungry) {
      this.parts.shift()
    }
    this.isHungry = true
  }

  draw (graphy: Graphics): void {
    graphy.beginFill(0xff0000)
    this.parts.forEach((part) =>
      graphy.drawRect(part.x, part.y, part.width, part.height)
    )
    graphy.endFill()

    graphy.beginFill(0x8b0000)
    graphy.drawRect(
      this.head.x,
      this.head.y,
      this.head.width,
      this.head.height
    )
    graphy.endFill()
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
