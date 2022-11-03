import { Container, Graphics, Loader } from 'pixi.js'
import { assets } from '../assets'
import { Manager } from '../Manager'
import { AbstractContainer } from './AbstractScene'
import { MenuScene } from './MenuScene'

export class LoaderScene extends AbstractContainer {
  loaderBarFill: Graphics
  loaderBarBoder: Graphics
  loaderBar: any

  constructor (width: number, height: number) {
    super(width, height)

    const loaderBarWidth = this.bounds.width * 0.8

    this.loaderBarFill = new Graphics()
    this.loaderBarFill.beginFill(0x008800, 1)
    this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50)
    this.loaderBarFill.endFill()
    this.loaderBarFill.scale.x = 0

    this.loaderBarBoder = new Graphics()
    this.loaderBarBoder.lineStyle(10, 0x0, 1)
    this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, 50)

    this.loaderBar = new Container()
    this.loaderBar.addChild(this.loaderBarFill)
    this.loaderBar.addChild(this.loaderBarBoder)
    this.loaderBar.position.x = (this.bounds.width - this.loaderBar.width) / 2
    this.loaderBar.position.y = (this.bounds.height - this.loaderBar.height) / 2
    this.addChild(this.loaderBar)

    Loader.shared.onProgress.add(this.onDownloadProgress, this)
    Loader.shared.onComplete.once(this.onDownloadComplete, this)
    Loader.shared.add(assets)
    Loader.shared.load()
  }

  update (): void {}

  private onDownloadProgress (loader: Loader): void {
    const progressRatio = loader.progress / 100
    this.loaderBarFill.scale.x = progressRatio
  }

  private onDownloadComplete (): void {
    Manager.changeScene(MenuScene)
  }
}
