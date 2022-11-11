import { Direction } from '../enums/Direction'
import { Input } from './input'

export class SwipeInput extends Input {
  private initialX: number | null = null
  private initialY: number | null = null

  setAnyEventHandler (handler: EventListener): void {
    this.clearAllHandlers()
    this.addEventListener('touchstart', handler)
  }

  setDirectionChangeEventHandler (handler: any): void {
    this.clearAllHandlers()
    this.addEventListener('touchstart', (event: any) => this.handleTouchStart(event))
    this.addEventListener('touchmove', (event: any) => handler(this.handleTouchMove(event)))
  }

  private handleTouchStart (event: any): void {
    this.initialX = event.touches[0].clientX
    this.initialY = event.touches[0].clientY
  }

  private handleTouchMove (event: any): Direction | null {
    if (!this.initialX || !this.initialY) {
      return null
    }

    const currentX = event.touches[0].clientX
    const currentY = event.touches[0].clientY

    const diffX = this.initialX - currentX
    const diffY = this.initialY - currentY

    let direction: Direction
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        direction = Direction.Right
      } else {
        direction = Direction.Left
      }
    } else {
      if (diffY > 0) {
        direction = Direction.Down
      } else {
        direction = Direction.Up
      }
    }

    this.initialX = null
    this.initialY = null

    return direction
  }
}
