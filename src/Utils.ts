import * as PIXI from 'pixi.js'

export function registerPixiInspector (): void {
  (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ && (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI })
}

export function getRandomNumber (max: number): number {
  return Math.floor(Math.random() * max)
}

export function clamp (number: number, min: number, max: number): number {
  return Math.min(Math.max(number, min), max)
}
