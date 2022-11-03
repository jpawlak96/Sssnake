import { BitmapFont } from 'pixi.js'
import { SCREEN_SIZE, BACKGROUND_COLOR } from './Constants'
import { Manager } from './managers/Manager'
import { LoaderScene } from './scenes/LoaderScene'

BitmapFont.from('comic 32', {
  fill: '#000000',
  fontFamily: 'Comic Sans MS',
  fontSize: 32
})

Manager.initialize(SCREEN_SIZE, SCREEN_SIZE, BACKGROUND_COLOR)
Manager.changeScene(LoaderScene)
