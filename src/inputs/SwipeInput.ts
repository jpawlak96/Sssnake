import { Direction } from '../enums/Direction'
import { Input } from './Input'

export class SwipeInput implements Input {
  private direction: Direction | null = null

  private initialX: number | null = null
  private initialY: number | null = null

  constructor () {
    document.addEventListener('touchstart', this.handleTouchStart.bind(this), false)
    document.addEventListener('touchmove', this.handleTouchMove.bind(this), false)
  }

  getDirection (): Direction | null {
    return this.direction
  }

  private handleTouchStart (event: any): void {
    this.initialX = event.touches[0].clientX
    this.initialY = event.touches[0].clientY
  }

  private handleTouchMove (event: any): void {
    if (!this.initialX || !this.initialY) {
      return
    }

    const currentX = event.touches[0].clientX
    const currentY = event.touches[0].clientY

    const diffX = this.initialX - currentX
    const diffY = this.initialY - currentY

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        this.direction = Direction.Right
      } else {
        this.direction = Direction.Left
      }
    } else {
      if (diffY > 0) {
        this.direction = Direction.Down
      } else {
        this.direction = Direction.Up
      }
    }

    this.initialX = null
    this.initialY = null
  }
}
