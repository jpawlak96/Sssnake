import { Direction } from '../enums/Direction'
import { Input } from './Input'

export class KeyInput extends Input {
  onAnyEvent (handler: EventListener): void {
    this.clearAllHandlers()
    this.addEventListener('keydown', handler)
  }

  onDirectionChangeEvent (handler: any): void {
    this.clearAllHandlers()
    this.addEventListener('keydown', (event: any) => handler(this.handleKeyboardEvent(event)))
  }

  private handleKeyboardEvent (event: any): Direction | null {
    let direction = null
    switch (event.key) {
      case 'ArrowUp':
        direction = Direction.Up
        break
      case 'ArrowDown':
        direction = Direction.Down
        break
      case 'ArrowLeft':
        direction = Direction.Left
        break
      case 'ArrowRight':
        direction = Direction.Right
        break
    }
    return direction
  }
}
