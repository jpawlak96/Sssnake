import { Application } from '@pixi/app'
import { IApplicationOptions } from 'pixi.js'
import { MAX_TILES_ON_SCREEN, MIN_TILES_ON_SCREEN, TILE_SIZE } from './Constants'
import { Input } from './inputs/Input'
import { AbstractContainer } from './scenes/AbstractScene'
import { clamp } from './Utils'

// eslint-disable-next-line
export class Manager {
  private static worldWidth: number
  private static worldHeight: number

  private static app: Application
  private static currentScene: AbstractContainer
  private static input: Input

  private constructor () {}

  public static initialize (options: IApplicationOptions, input: Input): void {
    Manager.app = new Application(options)
    Manager.app.ticker.add(Manager.update)
    Manager.setWorldSizeAndScale()
    Manager.input = input
    document.addEventListener('visibilitychange', Manager.onVisibilityChange)
  }

  public static changeScene (Clazz: new (width: number, height: number, input: Input) => AbstractContainer): void {
    if (Manager.currentScene) {
      Manager.app.stage.removeChild(Manager.currentScene)
      Manager.currentScene.destroy()
      Manager.input.clearAllHandlers()
    }
    Manager.currentScene = new Clazz(this.worldWidth, this.worldHeight, Manager.input)
    Manager.app.stage.addChild(Manager.currentScene)
  }

  private static setWorldSizeAndScale (): void {
    const screenWidth = Manager.app.screen.width
    const screenHeight = Manager.app.screen.height

    const isPortraitScreen = screenWidth < screenHeight
    if (isPortraitScreen) {
      const tilesPerRow = Math.floor(screenWidth / TILE_SIZE)
      const clampedTilesPerRow = clamp(tilesPerRow, MIN_TILES_ON_SCREEN, MAX_TILES_ON_SCREEN)
      this.worldWidth = clampedTilesPerRow * TILE_SIZE

      const scaledTileSize = TILE_SIZE * (tilesPerRow / clampedTilesPerRow)
      const tilesPerColumn = Math.floor(screenHeight / scaledTileSize)
      this.worldHeight = tilesPerColumn * TILE_SIZE
    } else {
      const tilesPerColumn = Math.floor(screenHeight / TILE_SIZE)
      const clampedTilesPerColumn = clamp(tilesPerColumn, MIN_TILES_ON_SCREEN, MAX_TILES_ON_SCREEN)
      this.worldHeight = clampedTilesPerColumn * TILE_SIZE

      const scaledTileSize = TILE_SIZE * (tilesPerColumn / clampedTilesPerColumn)
      const tilesPerRow = Math.floor(screenWidth / scaledTileSize)
      this.worldWidth = tilesPerRow * TILE_SIZE
    }

    Manager.app.stage.scale.x = screenWidth / this.worldWidth
    Manager.app.stage.scale.y = screenHeight / this.worldHeight
  }

  private static update (): void {
    if (Manager.currentScene) {
      const deltaTime = Manager.app.ticker.elapsedMS
      Manager.currentScene.update(deltaTime)
    }
  }

  private static onVisibilityChange (): void {
    if (document.visibilityState === 'hidden') {
      Manager.app.ticker.stop()
    } else {
      Manager.app.ticker.start()
    }
  }
}
