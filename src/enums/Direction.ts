export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export function areOpposite (directionA: Direction, directionB: Direction): boolean {
  switch (directionA) {
    case Direction.Up:
      if (directionB === Direction.Down) return true
      break
    case Direction.Down:
      if (directionB === Direction.Up) return true
      break
    case Direction.Left:
      if (directionB === Direction.Right) return true
      break
    case Direction.Right:
      if (directionB === Direction.Left) return true
      break
  }
  return false
}
