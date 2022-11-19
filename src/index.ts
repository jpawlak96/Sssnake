import { isMobile } from 'pixi.js'
import { BACKGROUND_COLOR } from './Constants'
import { KeyInput } from './inputs/KeyInput'
import { SwipeInput } from './inputs/SwipeInput'
import { Manager } from './Manager'
import { LoaderScene } from './scenes/LoaderScene'
import { registerPixiInspector } from './Utils'

registerPixiInspector()

const options = {
  view: document.getElementById('pixi-canvas') as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: BACKGROUND_COLOR
}

const input = isMobile.any ? new SwipeInput() : new KeyInput()

Manager.initialize(options, input)
Manager.changeScene(LoaderScene)
