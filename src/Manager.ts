import { Application } from '@pixi/app'
import { AbstractContainer } from './scenes/AbstractScene'

// eslint-disable-next-line
export class Manager {
  private constructor () {}

  private static app: Application
  private static currentScene: AbstractContainer

  public static initialize (width: number, height: number, background: number): void {
    Manager.app = new Application({
      view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      backgroundColor: background,
      width,
      height
    })

    Manager.app.ticker.add(Manager.update)
    document.addEventListener('visibilitychange', Manager.onVisibilityChange, false)
  }

  public static changeScene (Clazz: new (width: number, height: number) => AbstractContainer): void {
    if (Manager.currentScene) {
      Manager.app.stage.removeChild(Manager.currentScene)
      Manager.currentScene.destroy()
    }

    Manager.currentScene = new Clazz(Manager.app.screen.width, Manager.app.screen.height)
    Manager.app.stage.addChild(Manager.currentScene)
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
