import { Direction } from '../enums/Direction'
import { Input } from './Input'

export class KeyInput implements Input {
  direction: Direction | null = null

  constructor () {
    window.addEventListener('keydown', this.handleKeyboardEvent.bind(this), false)
  }

  getDirection (): Direction | null {
    return this.direction
  }

  private handleKeyboardEvent (event: any): void {
    switch (event.key) {
      case 'ArrowUp':
        this.direction = Direction.Up
        break
      case 'ArrowDown':
        this.direction = Direction.Down
        break
      case 'ArrowLeft':
        this.direction = Direction.Left
        break
      case 'ArrowRight':
        this.direction = Direction.Right
        break
    }
  }
}
