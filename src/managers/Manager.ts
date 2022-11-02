import { Application } from '@pixi/app'
import { IScene } from './IScene'

// eslint-disable-next-line
export class Manager {
  private constructor () {}

  private static app: Application
  private static currentScene: IScene | null

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

  public static changeScene (Clazz: new (identifier: Application) => IScene): void {
    if (Manager.currentScene) {
      Manager.app.stage.removeChild(Manager.currentScene)
      Manager.currentScene.destroy()
    }

    Manager.currentScene = new Clazz(this.app)
    Manager.app.stage.addChild(Manager.currentScene)
  }

  private static update (framesPassed: number): void {
    if (Manager.currentScene) {
      Manager.currentScene.update(framesPassed)
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
