import * as PIXI from 'pixi.js'

export function getRandomInt (max: number): number {
  return Math.floor(Math.random() * max)
}

export function registerPixiInspector (): void {
  (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__ && (window as any).__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI })
}
