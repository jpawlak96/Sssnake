import { Direction } from '../enums/Direction'

export interface Input {
  getDirection: () => Direction | null
}
