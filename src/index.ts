import { BitmapFont } from 'pixi.js'
import { SCREEN_SIZE, BACKGROUND_COLOR, FONT_NAME, FONT_STYLE } from './Constants'
import { Manager } from './Manager'
import { LoaderScene } from './scenes/LoaderScene'
import { registerPixiInspector } from './Utils'

registerPixiInspector()

BitmapFont.from(FONT_NAME, FONT_STYLE)

Manager.initialize(SCREEN_SIZE, SCREEN_SIZE, BACKGROUND_COLOR)
Manager.changeScene(LoaderScene)
