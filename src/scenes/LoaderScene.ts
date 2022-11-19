import { WebfontLoaderPlugin } from 'pixi-webfont-loader'
import { Container, Graphics, Loader } from 'pixi.js'
import { assets } from '../assets'
import { Input } from '../inputs/Input'
import { Manager } from '../Manager'
import { AbstractContainer } from './AbstractScene'
import { MenuScene } from './MenuScene'
import { sound } from '@pixi/sound'

export class LoaderScene extends AbstractContainer {
  isError: boolean = false

  loaderBarFill: Graphics
  loaderBarBoder: Graphics
  loaderBar: any

  constructor (width: number, height: number, input: Input) {
    super(width, height, input)

    const loaderBarWidth = width * 0.8
    const loaderBarHeight = height * 0.1

    this.loaderBarFill = new Graphics()
    this.loaderBarFill.beginFill(0x8b0000)
    this.loaderBarFill.drawRect(0, 0, loaderBarWidth, loaderBarHeight)
    this.loaderBarFill.endFill()
    this.loaderBarFill.scale.x = 0

    this.loaderBarBoder = new Graphics()
    this.loaderBarBoder.lineStyle(10)
    this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, loaderBarHeight)

    this.loaderBar = new Container()
    this.loaderBar.addChild(this.loaderBarFill)
    this.loaderBar.addChild(this.loaderBarBoder)
    this.loaderBar.position.x = (width - this.loaderBar.width) / 2
    this.loaderBar.position.y = (height - this.loaderBar.height) / 2
    this.addChild(this.loaderBar)

    Loader.registerPlugin(WebfontLoaderPlugin)
    Loader.shared.onProgress.add(this.onDownloadProgress, this)
    Loader.shared.onComplete.once(this.onDownloadComplete, this)
    Loader.shared.onError.once(this.onError, this)
    Loader.shared.add(assets)
    Loader.shared.load()
  }

  update (): void {}

  private onDownloadProgress (loader: Loader): void {
    const progressRatio = loader.progress / 100
    this.loaderBarFill.scale.x = progressRatio
  }

  private onDownloadComplete (): void {
    if (this.isError) {
      return
    }
    this.playBackgroundMusic()
    Manager.changeScene(MenuScene)
  }

  private playBackgroundMusic (): void {
    void sound.play('background', { loop: true, volume: 0.05 })
  }

  private onError (): void {
    this.isError = true
  }
}
